import { IsAdmin } from './checks/AdminCheck';
import {useContext} from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import GlobalContext from "../../shared/contexts/GlobalContext";

export default function PrivateAdminRoute({ children }) {
  const { client } = useContext(GlobalContext);
  const location = useLocation(); 
  if (!IsAdmin(client.role)) {
    return (
      <Navigate to="/" replace state={{ path: location.pathname }} />
    );
  }
  return children;
}