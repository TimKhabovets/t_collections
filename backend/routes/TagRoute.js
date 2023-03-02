import express from 'express';
import { getAllItemTags, addTag, updateTag, removeTag, removeOneTag, getTwentyTags} from '../controllers/TagController.js'

const route = express.Router();

route.post('/getall', getAllItemTags);
route.get('/gettwenty', getTwentyTags);
route.post('/add', addTag);
route.patch('/update/:id', updateTag);
route.delete('/remove/:id', removeTag);
route.post('/removeone', removeOneTag);

export default route;