import React from "react";
  
function Contribute() {

  const handleSubmit = (event) => {
    event.preventDefault(); 
    alert('File Uploaded submitted!');
  }

  return (
    <>
      <br></br>
      <h2>Contribute</h2> 
      <br></br>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*,.pdf" />
        <br></br>
        <br></br>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default Contribute;
