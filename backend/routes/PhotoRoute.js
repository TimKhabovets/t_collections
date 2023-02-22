import express from 'express';
import { getPhoto, removePhoto, addPhoto, updatePhoto} from '../controllers/PhotoController.js'

const route = express.Router();

route.get('/get/:id', getPhoto);
route.post('/add', addPhoto);
route.patch('/update/:id', updatePhoto);
route.delete('/remove/:id', removePhoto);

export default route;