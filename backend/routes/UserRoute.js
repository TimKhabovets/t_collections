import express from 'express';
import { getUsers, login, createUser, updateUser, deleteUser } from '../controllers/UserController.js'

const route = express.Router();

route.get('/users', getUsers);
route.post('/signup', createUser);
route.post('/login', login);
route.patch('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);

export default route;