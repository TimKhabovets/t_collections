import { getOne, getAll, create, update, remove } from '../service/ItemService.js';

export const getItem = async (req, res, next) => {
  try {
    const item = await getOne(req.params.id);
    return res.json(item);
  }
  catch (err) {
    next(err);
  }
}

export const getAllCollectionItems = async (req, res, next) => {
  try {
    const items = await getAll(req.body.author);
    return res.json(items);
  }
  catch (err) {
    next(err);
  }
}

export const addItem = async (req, res, next) => {
  try {
    //const { } = req.body;
    const item = await create();
    return res.json(item);
  }
  catch (err) {
    next(err);
  }
}

export const updateItem = async (req, res, next) => {
  try {
    const item = req.body;
    const itemDate = await update(item, req.params.id);
    return res.json(itemDate);
  }
  catch (err) {
    next(err);
  }
}

export const removeItem = async (req, res, next) => {
  try {
    const item = await remove(req.params.id);
    return res.json(item);
  }
  catch (err) {
    next(err);
  }
}