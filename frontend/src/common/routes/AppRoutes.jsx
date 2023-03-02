import { Route, Routes } from "react-router-dom";
import routes from "../../shared/constants/routes";
import Home from "../../app/home/Home";
import LogIn from "../../app/auth/login/LogIn"
import SignUp from "../../app/auth/signup/SignUp";
import UserPage from "../../app/user/userCollections/Collections";
import NewCol from "../../app/user/creation/Collection";
import NewItem from "../../app/user/creation/Item";
import Items from "../../app/user/collectionItems/Items";
import Admin from '../../app/admin/UserList'
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
      <Route path={routes.ADMIN} element={<PrivateAdminRoute><Admin/></PrivateAdminRoute>}/>
      <Route path={routes.ADMINUSERPAGE} element={<PrivateAdminRoute><UserPage/></PrivateAdminRoute>}/>
      <Route path={routes.ADMINITEMS} element={<PrivateAdminRoute><Items/></PrivateAdminRoute>}/>
    </Routes> 
  ); 
}