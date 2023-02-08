import User from '../models/UserModel.js';

export const getUsers = async (req, res) => {

  try {
    const response = await User.findAll();
      res.status(200).json(response);
  }
  catch(err) {
    console.log(err.msg);
  }
}

export const getUsersByEmail = async (req, res) => {

  try {
    const response = await User.findOne({
      where: { 
        email: req.params.email
      }
    });
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err.msg);
  }
}

export const createUser = async (req, res) => {

  try {
    await User.create(req.body);
    res.status(201).json({msg: 'User created'});
  }
  catch(err) {
    console.log(err.msg);
  }
}

export const updateUser = async (req, res) => {

  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: 'User updated'});
  }
  catch(err) {
    console.log(err.msg);
  }
}

export const deleteUser = async (req, res) => {

  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: 'User deleted'});
  }
  catch(err) {
    console.log(err.msg);
  }
}