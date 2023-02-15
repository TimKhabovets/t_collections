import express from 'express';
import { getUsers, login, createUser, updateUser, deleteUser, logout, refreshTokens} from '../controllers/UserController.js'

const route = express.Router();

route.get('/users', getUsers);
route.post('/signup', createUser);
route.post('/login', login);
route.post('/logout', logout);
route.get('/refresh', refreshTokens);
route.patch('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);

export default route;