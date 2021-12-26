import AuthProvider from "./Auth";
import {PublicRoute,PrivateRoute} from "./RouteAuth"
import { Routes,Route } from "react-router-dom";
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from "../pages/home";
import Setting from "../pages/setting/setting";
import Profile from "../pages/profile/profile";
import PostDisplay from "../pages/profile/PostCard/postDisplay";


function MyAppRouter() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
          <Route exact  element={<PrivateRoute/>}>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/setting' element={<Setting/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/post' element={<PostDisplay/>}/>
          </Route>       

          <Route  exact  element={<PublicRoute/>}>
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
