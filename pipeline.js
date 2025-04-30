const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');
const archiver = require('archiver');
const AWS = require('aws-sdk');
const { getCloseMatches } = require('string-similarity');

// ─── CONFIGURATION ─────────────────────────────────────────────────────
const FTP_HOST = "117.254.209.21";
const FTP_USER = "anonymous"; 
const FTP_PASSWORD = "";
const FTP_TARGET_FOLDER = "/b.tech/COMPUTER SCIENCE AND ENGG. II, III & IV YEAR";

const LOCAL_ROOT = "temp_pyq_data";
const MERGED_DIR = path.join(LOCAL_ROOT, "merged_subjects");
const CLUSTERED_DIR = path.join(LOCAL_ROOT, "subjects_clustered");
const ZIP_OUTPUT_DIR = path.join(CLUSTERED_DIR, "zips");

const S3_BUCKET = "your-s3-bucket-name";
const s3 = new AWS.S3();

// ─── CREATE REQUIRED FOLDERS ───────────────────────────────────────────
[MERGED_DIR, ZIP_OUTPUT_DIR].forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────

function formatPart(part) {
  return part
    .replace(/[^0-9A-Za-z]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');
}

function normalizeSubjectName(name) {
  return name
    .toUpperCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function ftpRecursiveDownload(client, remoteDir, localDir) {
  fs.mkdirSync(localDir, { recursive: true });
  const items = await client.list(remoteDir);

  for (let item of items) {
    const remotePath = path.join(remoteDir, item.name);
    const localPath = path.join(localDir, item.name);

    if (item.isDirectory) {
      await ftpRecursiveDownload(client, remotePath, localPath);
    } else if (item.name.toLowerCase().endsWith('.pdf')) {
      const writableStream = fs.createWriteStream(localPath);
      await client.downloadTo(writableStream, remotePath);
    }
  }
}

// ─── STEP 1: DOWNLOAD PDFs FROM FTP ──────────────────────────────────────
async function downloadFromFTP() {
  console.log("\nConnecting to FTP server and downloading files...");
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
    });

    await ftpRecursiveDownload(client, FTP_TARGET_FOLDER, LOCAL_ROOT);
    console.log("All PDFs downloaded from FTP.");
  } catch (err) {
    console.error("Error downloading from FTP:", err);
  } finally {
    client.close();
  }
}

// ─── STEP 2: MERGE PDFs INTO FLAT STRUCTURE ──────────────────────────────
function mergePDFs() {
  console.log("\nMerging all PDFs into a single flat folder...");
  fs.readdirSync(LOCAL_ROOT, { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      const subDir = path.join(LOCAL_ROOT, item.name);
      const files = fs.readdirSync(subDir);

      files.forEach(file => {
        if (file.toLowerCase().endsWith('.pdf')) {
          const formattedName = `${formatPart(item.name)}_${file}`;
          fs.copyFileSync(path.join(subDir, file), path.join(MERGED_DIR, formattedName));
        }
      });
    }
  });
  console.log("All PDFs merged into:", MERGED_DIR);
}

// ─── STEP 3: CLUSTER FILES BY SUBJECT ───────────────────────────────────
function clusterFiles() {
  console.log("\nClustering PDFs by subject...");
  const clusteredFiles = {};
  const knownSubjects = [];

  fs.readdirSync(MERGED_DIR).forEach(file => {
    if (file.toLowerCase().endsWith('.pdf')) {
      const subjectName = normalizeSubjectName(file.split('_').slice(-1)[0].replace('.pdf', ''));
      const closeMatch = getCloseMatches(subjectName, knownSubjects, 1, 0.9)[0];

      const canonicalName = closeMatch || subjectName;
      if (!closeMatch) knownSubjects.push(canonicalName);

      if (!clusteredFiles[canonicalName]) clusteredFiles[canonicalName] = [];
      clusteredFiles[canonicalName].push(file);
    }
  });

  Object.keys(clusteredFiles).forEach(subject => {
    const safeName = subject.replace(/[^A-Za-z0-9]/g, '_');
    const subjectDir = path.join(CLUSTERED_DIR, safeName);
    fs.mkdirSync(subjectDir, { recursive: true });

    clusteredFiles[subject].forEach(file => {
      fs.renameSync(path.join(MERGED_DIR, file), path.join(subjectDir, file));
    });
  });

  console.log("Clustering completed.");
}

// ─── STEP 4: ZIP EACH SUBJECT FOLDER ─────────────────────────────────────
function zipFolders() {
  console.log("\nZipping each subject folder...");
  fs.readdirSync(CLUSTERED_DIR).forEach(folder => {
    const folderPath = path.join(CLUSTERED_DIR, folder);

    if (fs.statSync(folderPath).isDirectory()) {
      const outputZip = fs.createWriteStream(path.join(ZIP_OUTPUT_DIR, `${folder}.zip`));
      const archive = archiver('zip');

      archive.pipe(outputZip);
      archive.directory(folderPath, false);
      archive.finalize();

      console.log(`Created zip for: ${folder}`);
    }
  });
}

// ─── STEP 5: UPLOAD TO S3 BUCKET ─────────────────────────────────────────
async function uploadToS3() {
  console.log("\nUploading zip files to S3 bucket...");

  try {
    const objects = await s3.listObjectsV2({ Bucket: S3_BUCKET }).promise();
    if (objects.Contents) {
      for (let obj of objects.Contents) {
        await s3.deleteObject({ Bucket: S3_BUCKET, Key: obj.Key }).promise();
      }
      console.log("Old files removed from S3.");
    }
  } catch (err) {
    console.error("Error listing or deleting objects from S3:", err);
  }

  fs.readdirSync(ZIP_OUTPUT_DIR).forEach(async zipFile => {
    const filePath = path.join(ZIP_OUTPUT_DIR, zipFile);
    const fileStream = fs.createReadStream(filePath);

    try {
      await s3
        .upload({ Bucket: S3_BUCKET, Key: zipFile, Body: fileStream })
        .promise();
      console.log(`Uploaded: ${zipFile}`);
    } catch (err) {
      console.error("Error uploading to S3:", err);
    }
  });
}

// ─── MAIN EXECUTION ──────────────────────────────────────────────────────
(async function main() {
  await downloadFromFTP();
  mergePDFs();
  clusterFiles();
  zipFolders();
  await uploadToS3();
  console.log("\nAll steps completed successfully. Ready to serve data via API.");
})();
