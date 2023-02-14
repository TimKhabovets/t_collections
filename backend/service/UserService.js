import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { generateToken, saveToken, removeToken, validateRefreshToken, findToken } from '../service/TokenService.js';
import UserDTO from '../dtos/UserDTO.js';
import ApiError from '../exceptions/ApiError.js';

export const registerUser = async (name, email, password) => {
  const data = await UserModel.findOne({
    where: { 
      email: email
    }
  });
  if (data) {
    throw ApiError.BadRequest(`User with email ${email} already registered`);
  }
  const hashPassword = await bcrypt.hash(password, 11)
  const user = await UserModel.create({ name, email, password: hashPassword}); 
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}

export const loginUser = async (email, password) => {
  const user = await UserModel.findOne({
    where: { 
      email: email
    }
  });
  if(!user) {
    throw ApiError.BadRequest('User not found'); 
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if(!isPasswordEqual) {
    throw ApiError.BadRequest('Password is not equal'); 
  }
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}

export const logOut = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
}

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnAuthorizedError();
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if(!userData  || !tokenFromDb) {
    throw ApiError.UnAuthorizedError();
  }
  const user = await UserModel.findOne({
    where: { 
      id: userData.id
    }
  });
  const userDTO = new UserDTO(user);
  const tokens = generateToken({...userDTO});
  await saveToken(userDTO.id, tokens.refreshToken);
  return {...tokens, user: userDTO};
}

export const getAllUsers = async () => {
  const users = UserModel.findAll();
  return users;
}