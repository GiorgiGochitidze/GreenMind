import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Form = ({
  formType,
  userName,
  email,
  password,
  setUserName,
  setEmail,
  setPassword,
  handleAuthForm,
  buttonName,
  message
}) => {
  const [showPass, setShowPass] = useState(false);
  const [inputType, setInputType] = useState("password");

  return (
    <div className="form-container">
      <h1>{formType}</h1>

      {formType !== 'LogIn' && (
        <label htmlFor="name">
          Your Name:
          <input
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            type="text"
            name="name"
            id="name"
          />
        </label>
      )}

      <label htmlFor="email">
        Your Email:
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          type="email"
          name="email"
          id="email"
          required
        />
      </label>

      <label style={{ position: "relative" }} htmlFor="password">
        Your Password:
        <input
          placeholder="Your Password"
          required
          type={inputType}
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="eye-container">
          {!showPass ? (
            <FaRegEyeSlash
              onClick={() => {
                setShowPass(true);
                setInputType("text");
              }}
            />
          ) : (
            <FaRegEye
              onClick={() => {
                setShowPass(false);
                setInputType("password");
              }}
            />
          )}
        </div>
      </label>

      {message && <p style={{ textAlign: 'center' }}>{message}</p>}

      <button onClick={handleAuthForm} className="auth-btn">{buttonName}</button>

      {formType === "Registration" ? (
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/LogIn" className="authLink-txt">
            <span>LogIn</span>
          </Link>
        </p>
      ) : (
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/Registration" className="authLink-txt">
            <span>Register</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default Form;
