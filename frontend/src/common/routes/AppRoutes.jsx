import { Route, Routes } from "react-router-dom";
import routes from "../../shared/constants/routes";
import Home from "../../app/home/Home";
import LogIn from "../../app/auth/login/LogIn"
import SignUp from "../../app/auth/signup/SignUp";
import UserPage from "../../app/user/page/UserPage";
import NewCol from "../../app/user/creation/Collection";
import NewItem from "../../app/user/creation/Item";
import Items from "../../app/user/items/Items";
import PrivateUserRoute from "../../shared/functions/privateUserRoute";
import PrivateAdminRoute from "../../shared/functions/privateAdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />}/>
      <Route path={routes.LOGIN} element={<LogIn />}/>
      <Route path={routes.SIGNUP} element={ <SignUp /> }/>
      <Route path={routes.USERPAGE} element={<PrivateUserRoute><UserPage/></PrivateUserRoute>}/>
      <Route path={routes.CREATECOLLECTION} element={<PrivateUserRoute><NewCol /></PrivateUserRoute>}/>
      <Route path={routes.CREATEITEM} element={ <PrivateUserRoute><NewItem /></PrivateUserRoute> }/>
      <Route path={routes.ITEMS} element={<PrivateUserRoute><Items/></PrivateUserRoute>}/>
    </Routes> 
  ); 
}