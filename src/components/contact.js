import React from 'react';

function Contact() {

  const handleSubmit = (event) => {
    event.preventDefault(); 
    alert('Form Uploaded submitted!');
  }

  return (
    <div>
      <br></br>
      <h2>Contact Me</h2>
      <br></br>
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td>
                <label htmlFor="name">Name:</label>
              </td>
              <td>
                <input type="text" id="name" name="name" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="message">Message:</label>
              </td>
              <td>
                <textarea id="message" name="message" required></textarea>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
      </form>
    </div>
  );
}

export default Contact;
