import { useState } from "react";
import "./CSS/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { LinkStyles } from "../LinkStyles";
import { LoadUser, SignInUser, SignUpUser } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type FormModeTypes = {
  mode: "signIn" | "signUp";
};

const Form = ({ mode }: FormModeTypes) => {
  const isSignIn = mode == "signIn";
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = useAppSelector((state) => state.user);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (isSignIn) {
          dispatch(SignInUser({ email, password }))
            .unwrap()
            .then(() => {
              setTimeout(() => {
                navigate("/");
                dispatch(LoadUser());
              }, 1200);
            })
            .catch((err) => {
              console.log("Sign in failed:", err);
            });
        } else {
          dispatch(SignUpUser({ userName, email, password }))
            .unwrap()
            .then(() => {
              setTimeout(() => {
                navigate("/");
                dispatch(LoadUser());
              }, 1200);
            })
            .catch((err) => {
              console.log("Sign up failed:", err);
            });
        }
      }}
    >
      <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
      {!isSignIn && (
        <label htmlFor="userName">
          <p>Your Name:</p>
          <input
            placeholder="John Doe"
            type="text"
            id="userName"
            name="userName"
            autoComplete="true"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      )}
      <label htmlFor="email">
        <p>Your Email:</p>
        <input
          placeholder="example@gmail.com"
          type="email"
          id="email"
          name="email"
          autoComplete="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        <p>Your Password:</p>
        <div className="input-container">
          <input
            placeholder="Your Password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <FaRegEye
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
              size={20}
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
              size={20}
            />
          )}
        </div>
      </label>
      {message && <p>{message}</p>}
      <button type="submit" className="auth-button">
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <p>
        {isSignIn ? "Already Have account?" : "Don't have account?"}{" "}
        <Link to={isSignIn ? "/signUp" : "/signIn"} style={LinkStyles}>
          <span style={{ color: "blue", fontWeight: "bolder" }}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </Link>
      </p>
    </form>
  );
};

export default Form;
