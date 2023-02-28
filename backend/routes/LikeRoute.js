import express from 'express';
import { getLike, removeLike, addLike } from '../controllers/LikeController.js'

const route = express.Router();

route.post('/get', getLike);
route.post('/add', addLike);
route.post('/remove', removeLike);

export default route;