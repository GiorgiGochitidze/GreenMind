import Form from "./Form";
import "./CSS/Auth.css"
import { useLocation } from "react-router-dom";

const Auth = () => {
    const location = useLocation()
    const isSignIn = location.pathname === "/signIn"

    return ( 
        <div className="auth-form-container">
        <Form mode={isSignIn ? "signIn" : "signUp"} />
        </div>
     );
}
 
export default Auth;