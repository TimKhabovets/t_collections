export function IsUser(role) {
  if(role === 'admin' || role === 'user'){
    return true;
  }
  else {
    return false;
  }
}