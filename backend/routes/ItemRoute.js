import express from 'express';
import { getAllCollectionItems, getItem, removeItem, removeAllItem, addItem, updateItem, getFourLastItems, getAllTagItems, addItemToAlgolia} from '../controllers/ItemController.js'

const route = express.Router();

route.get('/get/:id', getItem);
route.post('/getall', getAllCollectionItems);
route.get('/getbytag/:tag', getAllTagItems);
route.get('/getfour', getFourLastItems);
route.post('/add', addItem);
route.post('/addalgolia', addItemToAlgolia);
route.patch('/update/:id', updateItem);
route.delete('/remove/:id', removeItem);
route.post('/removeall', removeAllItem);

export default route;