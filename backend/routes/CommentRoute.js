import express from 'express';
import { getAllItemComments, addComment } from '../controllers/CommentController.js'

const route = express.Router();

route.get('/getall/:item', getAllItemComments);
route.post('/add', addComment);

export default route;