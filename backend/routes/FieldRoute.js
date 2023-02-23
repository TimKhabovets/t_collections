import express from 'express';
import { getAllItemFields, removeField, addField, updateField} from '../controllers/FieldController.js'

const route = express.Router();

route.post('/getall', getAllItemFields);
route.post('/add', addField);
route.patch('/update/:id', updateField);
route.delete('/remove/:id', removeField);

export default route;