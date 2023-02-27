import express from 'express';
import { getAllCollectionItems, getItem, removeItem, removeAllItem, addItem, updateItem} from '../controllers/ItemController.js'

const route = express.Router();

route.get('/get/:id', getItem);
route.post('/getall', getAllCollectionItems);
route.post('/add', addItem);
route.patch('/update/:id', updateItem);
route.delete('/remove/:id', removeItem);
route.post('/removeall', removeAllItem);

export default route;