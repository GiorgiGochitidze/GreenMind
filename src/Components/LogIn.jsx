import { useState } from "react";
import "./CSS/forms.css";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const isValidEmail = () => {
    // Check if email ends with known domains
    if (
      email.endsWith("@gmail.com") ||
      email.endsWith("@yahoo.com") ||
      email.endsWith("@hotmail.com")
    ) {
      return true;
    }
    return false;
  };

  const handleLogIn = () => {
    if (!userName || !email || !password) {
      setMessage("Please fill all fields");
      setTimeout(() => {
        setMessage("");
      }, 1200);
      return;
    }

    if (!isValidEmail()) {
      setMessage("Incorrect email format");
      setTimeout(() => {
        setMessage("");
      }, 1200);
      return;
    }

    axios
      .post("https://greenmind-2844.onrender.com/logIn", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        const { token } = response.data;

        sessionStorage.setItem("token", token);

        // Set a success message
        setMessage("Logged in successfully");

        // Redirect after 1.5 seconds
        setTimeout(() => {
          navigate("/"); // Redirect to the home page
          window.location.reload()
        }, 1500);
      })
      .catch((err) => {
        console.log("Something went wrong while sending logIn data", err);
        setMessage("Failed to log in check all fields");
        setTimeout(() => {
          setMessage('')
        }, 1200);
      });
  };

  return (
    <div className="auth-container">
      <Form
        userName={userName}
        email={email}
        password={password}
        setUserName={setUserName}
        setPassword={setPassword}
        setEmail={setEmail}
        formType={"LogIn"}
        buttonName={"Log In"}
        handleAuthForm={handleLogIn}
        message={message}
      />
    </div>
  );
};

export default LogIn;
