import express from 'express';
import { getUsers, getUsersByEmail, createUser, updateUser, deleteUser } from '../controllers/UserController.js'

const route = express.Router();

route.get('/users', getUsers);
route.post('/users', createUser);
route.get('/users/:email', getUsersByEmail);
route.patch('/users/:id', updateUser);
route.delete('/users/:id', deleteUser);



export default route;