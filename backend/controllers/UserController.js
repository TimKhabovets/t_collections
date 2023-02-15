import User from '../models/UserModel.js';
import { registerUser, loginUser, logOut, refresh, getAllUsers } from '../service/UserService.js';

export const getUsers = async (req, res, next) => {
  
  try {
    const users = await getAllUsers();
    return res.json(users);
  }
  catch(err) {
    next(err);
  }
}

export const login = async (req, res, next) => {

  try {
    const { email, password } = req.body.value;
    const user = await loginUser(email, password);
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, domain: ".t-collections.vercel.app"});
    return res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const logout = async (req, res, next) => {

  try {
    const {refreshToken} = req.cookies;
    const token = await logOut(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  }
  catch(err) { 
    next(err);
  }
}

export const refreshTokens = async (req, res, next) => {

  try {
    const {refreshToken} = req.cookies;
    console.log(refreshToken);
    const user = await refresh(refreshToken);
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, domain: '.t-collections.vercel.app'});
    return res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {

  try {
    const { name, email, password } = req.body.value;
    const user = await registerUser(name, email, password);
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000});
    res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const updateUser = async (req, res, next) => {

  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: 'User updated'});
  }
  catch(err) {
    next(err);
  }
}

export const deleteUser = async (req, res, next) => {

  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: 'User deleted'});
  }
  catch(err) {
    next(err);
  }
}