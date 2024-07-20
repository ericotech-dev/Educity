import React, { useState } from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';


const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Append custom subject based on user input
    const subject = `You've got a message from ${firstName}`;
    formData.append("subject", subject);
    formData.append("access_key", "2ad41d5f-675d-4a27-bae8-184327e80106");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setResult("Message sent successfully!");
      } else {
        console.log("Error", res);
        setResult("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Failed to send message. Please try again later.");
    }

    event.target.reset(); // Reset the form
    setFirstName(''); // Reset the first name state
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  
  return (
    <div className='contact'>
      <div className='contact-col'>
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>Feel free to reach out through the contact form or find our contact
          information below. Your feedback, questions and suggestions are 
          important to us as we strive to provide exceptional service to our
          university community.</p>
        <ul>
          <li><img src={mail_icon} alt="" />info@educity.com</li>
          <li><img src={phone_icon} alt="" />+1 123-456-7890</li>
          <li><img src={location_icon} alt="" />77 Massachusetts Ave, Cambridge<br /> MA 02139, United States</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" placeholder='Enter your name' name='name' value={firstName} onChange={handleFirstNameChange} required />
          <label>Email Address</label>
          <input type="email" placeholder='Enter Your Email' name='email' required />
          <label>Your Message</label>
          <textarea name="message" rows="6" placeholder='Enter Your Message Here' required></textarea>
          <button type='submit' className='btn dark-btn '>Submit Now <img src={white_arrow} alt="" /></button>
        </form>
        {result && <p className="result-message">{result}</p>} {/* Display result message */}
      </div>
    </div>
  );
};

export default Contact;