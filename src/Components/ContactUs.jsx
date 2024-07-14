import "./CSS/contactus.css";

const ContactUs = () => {
  return (
    <div className="contactus-container">
      <div className="contactus">
        <h1>Contact Us</h1>

        <div className="fields-container">
          <label htmlFor="name">
            User Name:
            <input type="text" placeholder="Name" name="name" id="name" />
          </label>

          <label htmlFor="email">
            Email:
            <input type="text" placeholder="Email" name="email" id="email" />
          </label>

          <label htmlFor="message">
            Your Message:
            <textarea
              type="text"
              placeholder="Message"
              name="message"
              id="message"
            />
          </label>
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
