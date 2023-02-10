import jwt from 'jsonwebtoken';
import TokenModel from '../models/TokenModel.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20m'});
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
  return {accessToken, refreshToken};
};
  
export const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({
    where: {
      user: userId,
    }
  });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await TokenModel.create({user: userId, refreshToken});
  return token;
}