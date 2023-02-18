import GlobalContext from "../../shared/contexts/GlobalContext"

export function isAdmin() {
  const { client } = useContext(GlobalContext);
  if(client.role === 'admin')
    return true;
}