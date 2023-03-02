import User from '../models/UserModel.js';
import { registerUser, loginUser, logOut, refresh, getAllUsers, remove, update } from '../service/UserService.js';

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
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30*24*60*60*1000, 
      httpOnly: true,
      path: '/',
      domain: 't-collections.vercel.app', 
      sameSite: "none",
      secure: true,
    });
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
    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30*24*60*60*1000, 
      httpOnly: true, 
      domain: 't-collections-api.vercel.app', 
      sameSite: "none",
      secure: true,
    });
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
    res.cookie('refreshToken', user.refreshToken, { 
      maxAge: 30*24*60*60*1000, 
      httpOnly: true, 
      domain: 't-collections-api.vercel.app', 
      sameSite: "none",
      secure: true,
    });
    res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await update(req.body, req.params.id);
    res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await remove(req.params.id);
    res.json(user);
  }
  catch(err) {
    next(err);
  }
}