import { Routes,Route } from "react-router-dom";
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from "../pages/home";
import AuthProvider from "./Auth";
import {PublicRoute,PrivateRoute} from "./RouteAuth"

function MyAppRouter() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
          <Route exact path='/home' element={<PrivateRoute/>}>
            <Route exact path='/home' element={<Home/>}/>
          </Route>       

          <Route  exact path='' element={<PublicRoute/>}>
                <Route path="/login" element={<Login />}/> 
                <Route path="/signup" element={<Signup />} />
            </Route>       
              
                {/* <Route path="new" element={<NewTeamForm />} /> */} 
    </Routes>
    </AuthProvider>
    </div>
  );
}
export default MyAppRouter;
