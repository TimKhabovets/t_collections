import GlobalContext from "../../shared/contexts/GlobalContext"

export function isUser() {
  const { client } = useContext(GlobalContext);
  if(client.role === 'user')
    return true;
}