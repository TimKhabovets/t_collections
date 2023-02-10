export default class UserDTO {
  name;
  email;
  id;
  role;
    
  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model.id;
    this.role = model.role;
  }
}