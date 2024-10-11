import "./CSS/privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1 style={{ textAlign: "center" }}>Privacy Policy At MelinaMShop</h1>

      <ol style={{ margin: "0 auto", width: "80%", textAlign: "justify" }}>
        <li>
          <strong>Data Collection:</strong> We collect user authentication data
          (username, email, and password) when you create an account with us or
          make a purchase. This information is used solely for account
          management, providing services, and improving user experience.
        </li>{" "}
        <br />
        <li>
          <strong>Password Security:</strong> To ensure the safety of your
          personal data, all passwords are securely hashed using
          industry-standard encryption techniques. This means that your password
          is never stored in its plain form and cannot be retrieved by anyone,
          including us.
        </li>{" "}
        <br />
        <li>
          <strong>Data Usage:</strong> Your email address and username are used
          for account identification and communication purposes. We may use your
          email to send important updates related to your orders or our
          services. However, we do not share your personal information with
          third parties unless required by law.
        </li>{" "}
        <br />
        <li>
          <strong>Data Storage:</strong> We store all user data on secure
          servers, which are protected against unauthorized access. Regular
          security audits are conducted to maintain the highest level of data
          protection.
        </li>{" "}
        <br />
        <li>
          <strong>Your Rights:</strong> You have the right to access, update, or
          request deletion of your personal data at any time. If you have any
          concerns about how your data is being used or wish to request changes,
          please contact us at [melinamgeorgia@gmail.com].
        </li>{" "}
        <br />
        <li>
          <strong>Updates to this Policy:</strong> We reserve the right to
          update this privacy policy to reflect changes in our practices or
          legal requirements. We will notify users of any significant changes to
          how we handle their personal information.
        </li>
      </ol>
    </div>
  );
};

export default Privacy;
