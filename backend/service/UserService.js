import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { generateToken, saveToken } from '../service/TokenService.js';
import UserDTO from '../dtos/UserDTO.js';
import ApiError from '../exceptions/ApiError.js';
const apiError = new ApiError();

export const registerUser = async (name, email, password) => {
  const data = await UserModel.findOne({
    where: { 
      email: email
    }
  });
  if (data) {
    throw apiError.BadRequest(`User with email ${email} already registered`);
  }
  const hashPassword = await bcrypt.hash(password, 11)
  const user = await UserModel.create({ name, email, password: hashPassword}); 
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}

export const loginUser = async function(email, password) {
  const user = await UserModel.findOne({
    where: { 
      email: email
    }
  });
  if(!user) {
    throw apiError('User not found'); 
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if(!isPasswordEqual) {
    throw apiError('Password is not equal'); 
  }
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}
