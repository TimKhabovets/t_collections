import express from 'express';
import { getAllCollections, getCollection, removeCollection, addCollection, updateCollection} from '../controllers/CollectionController.js'

const route = express.Router();

route.get('/get/:id', getCollection);
route.get('/getall', getAllCollections);
route.post('/add', addCollection);
route.patch('/update/:id', updateCollection);
route.delete('/remove/:id', removeCollection);

export default route;