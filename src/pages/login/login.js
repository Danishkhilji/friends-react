import LoginForm from "./login_Component/loginForm";
import { useContext } from "react";
import { AuthContext } from "../../routes/Auth";
import Home from "../home";
function Login() {

  return(
  <>
  <LoginForm></LoginForm>
  </>
// const { currentUser } = useContext(AuthContext);
//   return !currentUser? <LoginForm/>:<Home/>

)}

export default Login;
