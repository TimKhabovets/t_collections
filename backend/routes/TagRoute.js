import express from 'express';
import { getAllItemTags, addTag, updateTag, removeTag, removeOneTag} from '../controllers/TagController.js'

const route = express.Router();

route.post('/getall', getAllItemTags);
route.post('/add', addTag);
route.patch('/update/:id', updateTag);
route.delete('/remove/:id', removeTag);
route.post('/removeone', removeOneTag);

export default route;