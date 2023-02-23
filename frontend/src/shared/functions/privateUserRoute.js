import { IsUser } from './checks/UserCheck';
import {useContext} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import GlobalContext from "../../shared/contexts/GlobalContext";

export default function PrivateUserRoute({ children }) {
  const { client } = useContext(GlobalContext);
  const location = useLocation(); 
  if (!IsUser(client.role)) {
    return (
      <Navigate to="/" replace state={{ path: location.pathname }} />
    );
  }
  return children;
}