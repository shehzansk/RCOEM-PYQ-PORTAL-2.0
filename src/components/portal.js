import React, { useState } from 'react';
import "../App.css";
import downloadPng from '../media/downloadPng.png';

function Portal() {
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const branchData = {
    "be": {
      "cse": [
        "Artificial Intelligence",
        "Business Communication",
        "Compiler Design",
        "Computer Architecture and Organization",
        "Computer Network",
        "Cyber Law & Ethics",
        "Data Structures",
        "Database Management System",
        "Design and Analysis",
        "Digital Electronics",
        "Discrete Mathematics",
        "Object Oriented Programming",
        "Operating System",
        "Software Engineering",
        "Theory of Computation",
        "Advanced Object Oriented Technologies",
        "Advanced Algorithms",
        "Advanced Data Structures",
        "AI and Machine Learning",
        "Application Security",
        "Artificial Intelligence and Cyber Security",
        "Artificial Intelligence Principles",
        "Artificial Intelligence Principles and Techniques",
        "Auditing IT Infrastructure for Compliance",
        "Basics of Ethical Hacking",
        "Big Data Analysis",
        "Bio Informatics",
        "Cloud Computing",
        "Computer Graphics",
        "Cryptography and Network Security",
        "Data Science Programming Languages",
        "Data Analytics",
        "Data Mining and Warehousing",
        "Deep Learning",
        "Design Patterns",
        "Distributed Systems",
        "Digital Circuits and Fundamentals of Microprocessors",
        "Discrete Mathematics and Graph Theory",
        "Embedded Machine Learning",
        "Formal Languages and Automata Theory",
        "Fundamentals of AWS Cloud",
        "Fundamentals of Digital Image and Video Processing",
        "Fundamentals of Digital Logic and Computer Architecture",
        "Grid and Cloud Computing",
        "Human Computer Interaction",
        "Information Security and Privacy",
        "Internet of Things",
        "Language Processor",
        "Large Scale Data Analytics",
        "Linear Algebra and Statistics",
        "Machine Learning",
        "Mathematics for Cyber Security",
        "Mathematics for Data Science",
        "Mathematics for Machine Learning",
        "MERN Stack",
        "Mobile Application Programming",
        "Natural Language Processing",
        "Network Security Administration",
        "Neural Network and Deep Learning",
        "Probability and Queueing Theory",
        "Programming for Data Science",
        "Python and Data Analysis",
        "Secure Coding",
        "Software Engineering",
        "Systems Programming",
        "Theory of Computation",
        "Theoretical Foundations of Computer Science",
        "Transform Calculus and Applied Statistics",
        "Transportation Engineering",
        "Web Architecture and Technologies"
      ]
    }
  };
  const subjectFilenameMap = {
    "Artificial Intelligence": "ARTIFICIAL_INTELLIGENCE",
    "Business Communication": "BUSINESS_COMMUNICATION",
    "Compiler Design": "COMPILER_DESIGN",
    "Computer Architecture and Organization": "COMPUTER_ARCHITECTURE_AND_ORGANIZATION",
    "Computer Network": "COMPUTER_NETWORK",
    "Cyber Law & Ethics": "CYBER_LAWS_AND_ETHICS_IN_IT",
    "Data Structures": "DATA_STRUCTURES",
    "Database Management System": "DATABAE_MANAGEMENT_SYSTEM",
    "Design and Analysis": "DESIGN_AND_ANALYSIS",
    "Digital Electronics": "DIGITAL_CIRCUITS_AND_FUNDAMENTALS_OF_MICROPROCESSOR",
    "Discrete Mathematics": "DISCRETE_MATHAMATICS",
    "Object Oriented Programming": "OBJECT_ORIENTED_PROGAMMING",
    "Operating System": "OPERATING_SYSTEM",
    "Software Engineering": "SOFTWAE_ENGINEERING",
    "Theory of Computation": "THEORY_OF_COMPUTATION",
    "Advanced Object Oriented Technologies": "ADVACED_OBJECT_ORIENTED_TECHNOLOGIES",
    "Advanced Algorithms": "ADVANCED_ALGORITHMS",
    "Advanced Data Structures": "ADVANCED_DATA_STRUCTURE",
    "AI and Machine Learning": "AI_AND_MACHINE_LEARNING",
    "Application Security": "APPLICATION_SECURITY",
    "Artificial Intelligence and Cyber Security": "ARTIFICIAL_INTELLIGENCE_AND_CYBER_SECURITY",
    "Artificial Intelligence Principles": "ARTIFICIAL_INTELLIGENCE__PRINCIPLES",
    "Artificial Intelligence Principles and Techniques": "ARTIFICIAL_INTELLIGENCE__PRINCIPLES_AND_TECHNIQUES",
    "Auditing IT Infrastructure for Compliance": "AUDITING_IT_INFRASTRUCTURE_FOR_COMPLIANCE",
    "Basics of Ethical Hacking": "BASICS_OF_ETHICAL_HACKING",
    "Big Data Analysis": "BIG_DATA_ANALYSIS",
    "Bio Informatics": "BIO_INFORMATICS",
    "Cloud Computing": "CLOUD_COMPUTING",
    "Computer Graphics": "COMPUTER_GRAPHICS",
    "Cryptography and Network Security": "CRYPTOGRAPHY_AND_NETWORK_SECURITY",
    "Data Science Programming Languages": "DATA_SCIENCE_PROGRAMMING_LANGUAGES",
    "Data Analytics": "DATA_ANALYTICS",
    "Data Mining and Warehousing": "DATA_MINING_AND_WAREHOUSING",
    "Deep Learning": "DEEP_LEARNING",
    "Design Patterns": "DESIGN_PATTERN",
    "Distributed Systems": "DISTRIBUTED_SYSTEM",
    "Digital Circuits and Fundamentals of Microprocessors": "DIGITAL_CIRCUITS_AND_FUNDAMENTALS_OF_MICROPROCESSOR",
    "Discrete Mathematics and Graph Theory": "DISCRETE_MATHEMATICS_AND_GRAPH_THEORY",
    "Embedded Machine Learning": "EMBEDDED_MACHINE_LEARNING",
    "Formal Languages and Automata Theory": "FORMAL_LANGUAGES_AND_AUTOMATA_THEORY",
    "Fundamentals of AWS Cloud": "FUNDAMENTALS_OF_AWS_CLOUD",
    "Fundamentals of Digital Image and Video Processing": "FUNDAMENTALS_OF_DIGITAL_IMAGE_AND_VIDEO_PROCESSING",
    "Fundamentals of Digital Logic and Computer Architecture": "FUNDAMENTALS_OF_DIGITAL_LOGIC_AND_COMPUTER_ARCHITECTURE",
    "Grid and Cloud Computing": "GRID_AND_CLOUD_COMPUTING",
    "Human Computer Interaction": "HUMAN_COMPUTER_INTERACTION",
    "Information Security and Privacy": "INFORMATION_SECURITY_AND_PRIVACY",
    "Internet of Things": "INTERNET_OF_THINGS",
    "Language Processor": "LANGUAGE_PROCESSOR",
    "Large Scale Data Analytics": "LARGE_SCALE_DATA_ANALYTICS",
    "Linear Algebra and Statistics": "LINEAR_ALGEBRA_AND_STATISTICS",
    "Machine Learning": "MACHINE_LEARNING",
    "Mathematics for Cyber Security": "MATHEMATICS_FOR_CYBER_SECURITY",
    "Mathematics for Data Science": "MATHEMATICS_FOR_DATA_SCIENCE",
    "Mathematics for Machine Learning": "MATHEMATICS_FOR_MACHINE_LEARNING",
    "MERN Stack": "MERN_STACK",
    "Mobile Application Programming": "MOBILE_APPLICATION_PROGRAMMING",
    "Natural Language Processing": "NATURAL_LANGUAGE_PROCESSING",
    "Network Security Administration": "NETWORK_SECURITY_ADMINISTRATION",
    "Neural Network and Deep Learning": "NEURAL_NETWORK_AND_DEEP_LEAR",
    "Probability and Queueing Theory": "PROBABILITY_AND_QUEUEING_THEORY",
    "Programming for Data Science": "PROGRAMMING_FOR_DATA_SCIENCE",
    "Python and Data Analysis": "PYTHON_AND_DATA_ANALYSIS",
    "Secure Coding": "SECURE_CODING",
    "Systems Programming": "SYSTEMS_PROGRAMMING",
    "Theoretical Foundations of Computer Science": "THEORETICAL_FOUNDATION_OF_COMPUTER_SCIENCE",
    "Transform Calculus and Applied Statistics": "TRANSFORM__CALCULUS_AND_APPLIED_STATISTICS",
    "Transportation Engineering": "TRANSPORTATION_ENGINEERING",
    "Web Architecture and Technologies": "WEB_ARCHITECTURE_AND_TECHNOLOGIES",
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
    setSubject('');
    setShowLink(false);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
    setShowLink(false);
  };

  const handleShowLink = () => {
    if (!subject) {
      alert("Please select a subject first!");
      return;
    }
    setLoading(true);

    const fileName = subjectFilenameMap[subject];
    if (!fileName) {
      alert("Subject mapping not found!");
      setLoading(false);
      return;
    }

    const apiUrl = `${process.env.REACT_APP_API_URL}?subject=${encodeURIComponent(fileName)}`;

    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.url) {
          setDownloadUrl(data.url);
          setShowLink(true);
        } else {
          alert("No download URL received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred:", error.message);
        alert(`Fetch failed: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center bg-black/10 backdrop-blur-3xl py-12 w-full max-w-[500px] mx-auto rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/30 border border-white/20 space-y-6 px-4">
      {/* Branch Dropdown */}
      <select
        value={branch}
        onChange={handleBranchChange}
        className="w-full md:w-72 h-12 px-4 bg-black/20 border border-white/30 text-white rounded-lg text-lg outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-300 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-no-repeat bg-right pr-10"
      >
        <option value="" className="text-lg py-4 text-gray-800">
          Select Branch
        </option>
        {Object.keys(branchData["be"]).map((key) => (
          <option
            key={key}
            value={key}
            className="text-lg py-4 text-gray-800"
          >
            {key.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Subject Dropdown */}
      <select
        value={subject}
        onChange={handleSubjectChange}
        className="w-full md:w-72 h-12 px-4 bg-black/20 border border-white/30 text-white rounded-lg text-lg outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-300 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27currentColor%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-no-repeat bg-right pr-10"
      >
        <option value="" className="text-lg py-4 text-gray-800">
          Select Subject
        </option>
        {branch &&
          branchData["be"][branch] &&
          [...new Set(branchData["be"][branch])].map((subj) => (
            <option
              key={subj}
              value={subj}
              className="text-lg py-4 text-gray-800"
            >
              {subj}
            </option>
          ))}
      </select>

      {/* Show Download Link Button */}
      <button
        onClick={handleShowLink}
        className="w-full md:w-72 h-12 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full text-lg font-semibold transition duration-300 hover:from-blue-600 hover:to-green-500 shadow-md"
      >
        Show Download Link
      </button>

      {/* Loading Indicator or Download Link */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 mt-6">
          <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="text-white text-lg">
            Fetching download link...
          </span>
        </div>
      ) : (
        showLink &&
        branch &&
        subject &&
        downloadUrl && (
          <div className="text-center mt-6">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <button className="flex items-center justify-center gap-2 w-full md:w-72 h-12 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-500 transition duration-300 shadow-lg">
                <span>Click Here To Download</span>
                <img src={downloadPng} alt="Download" className="h-5 w-5 -mb-1" />
              </button>
            </a>
          </div>
        )
      )}
    </div>
  );
}

export default Portal;