import { Route, Routes } from "react-router-dom";
import routes from "../../shared/constants/routes";
import Home from "../../app/home/Home";
import LogIn from "../../app/auth/login/LogIn"
import SignUp from "../../app/auth/signup/SignUp";
import UserPage from "../../app/user/page/UserPage";
import NewCol from "../../app/user/creation/NewCollection"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />}/>
      <Route path={routes.LOGIN} element={<LogIn />}/>
      <Route path={routes.SIGNUP} element={ <SignUp /> }/>
      <Route path={routes.USERPAGE} element={ <UserPage /> }/>
      <Route path={routes.NEWCOL} element={ <NewCol /> }/>
    </Routes> 
  ); 
}