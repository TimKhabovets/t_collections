import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { generateToken, saveToken } from '../service/TokenService.js';
import UserDTO from '../dtos/UserDTO.js';
import ApiError from '../exceptions/ApiError.js';

export const registerUser = async (name, email, password) => {
  const data = await UserModel.findOne({
    where: { 
      email: email
    }
  });
  if (data) {
    throw new ApiError.BadRequest(`User with email ${email} already registered`);
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
    throw new ApiError('User not found'); 
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if(!isPasswordEqual) {
    throw ApiError('Password is not equal'); 
  }
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}
