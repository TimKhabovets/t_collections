import express from 'express';
import { getAllUserCollections, getCollection, removeCollection, addCollection, updateCollection, getFourCollection} from '../controllers/CollectionController.js'

const route = express.Router();

route.get('/get/:id', getCollection);
route.post('/getall', getAllUserCollections);
route.get('/getfour', getFourCollection);
route.post('/add', addCollection);
route.patch('/update/:id', updateCollection);
route.delete('/remove/:id', removeCollection);

export default route;