import User from '../models/UserModel.js';
import { registerUser, loginUser } from '../service/UserService.js';

export const getUsers = async (req, res, next) => {
  
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  }
  catch(err) {
    next(err);
  }
}

export const login = async (req, res, next) => {

  try {
    const { email, password } = req.body.value;
    const user = await loginUser(email, password);
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
    res.json(user);
  }
  catch(err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {

  try {
    const { name, email, password } = req.body.value;
    const user = await registerUser(name, email, password);
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
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