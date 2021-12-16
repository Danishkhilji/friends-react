import SignUpForm from './signup_form/signupForm';
import { useContext } from "react";
import { AuthContext } from "../../routes/Auth";
import Home from "../home";

function Signup() {
  return <SignUpForm/>  
    
}

export default Signup;
