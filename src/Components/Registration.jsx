import { useState } from "react";
import "./CSS/forms.css";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const isValidEmail = () => {
    if (
      email.endsWith("@gmail.com") ||
      email.endsWith("@yahoo.com") ||
      email.endsWith("@hotmail.com")
    ) {
      return true;
    }
    return false;
  };

  const handleRegister = () => {

    if (!userName || !email || !password) {
      setMessage("Please fill all fields");
      setTimeout(() => {
        setMessage("");
      }, 1200);
      return;
    }

    if(password.length < 4){
      setMessage("Password should be more than 4 symbols");
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

    axios.post("https://greenmind-2844.onrender.comregister", {
        userName: userName,
        email: email,
        password: password,
    }).then((response) => {
      console.log(response.data);
      setMessage("Registered successfully");

        setTimeout(() => {
          navigate("/LogIn");
          window.location.reload()
        }, 1500);
    })
    .catch((err) => {
        console.log('Something went wrong while sending registration data', err)
        setMessage("Failed to log in check all fields");
        setTimeout(() => {
          setMessage('')
        }, 1200);
    })
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
        formType={"Registration"}
        handleAuthForm={handleRegister}
        buttonName={'Register'}
        message={message}
      />
    </div>
  );
};

export default Registration;
