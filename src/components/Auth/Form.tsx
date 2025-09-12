import { useState } from "react";
import "./CSS/Form.css";

type FormModeTypes = {
  mode: "signIn" | "signUp";
};

const Form = ({ mode }: FormModeTypes) => {
  const isSignIn = mode == "signIn";
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form>
      <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
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
        <input
          placeholder="Your Password"
          type="Password"
          id="password"
          name="password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="auth-button">
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <p>
        Already Have account?{" "}
        <span style={{ color: "blue", fontWeight: "bolder" }}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </form>
  );
};

export default Form;
