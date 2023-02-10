import GlobalContext from "../../shared/contexts/GlobalContext"

export default function isAdmin() {
  const { client } = useContext(GlobalContext);
  if(client.role === 'admin')
    return true;
}