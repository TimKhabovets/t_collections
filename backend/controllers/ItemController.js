import { getOne, getAll, create, update, remove, removeAll, getFour, getTagItems, createAlgoliaObject } from '../service/ItemService.js';

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
    const items = await getAll(req.body.collection);
    return res.json(items);
  }
  catch (err) {
    next(err);
  }
}

export const getAllTagItems = async (req, res, next) => {
  try {
    const items = await getTagItems(req.params.tag);
    return res.json(items);
  }
  catch (err) {
    next(err);
  }
}

export const getFourLastItems = async (req, res, next) => {
  try {
    const items = await getFour();
    return res.json(items);
  }
  catch (err) {
    next(err);
  }
}

export const addItem = async (req, res, next) => {
  try {
    const item = await create(req.body);
    return res.json(item);
  }
  catch (err) {
    next(err);
  }
}

export const addItemToAlgolia = async (req, res, next) => {
  try {
    const item = await createAlgoliaObject(req.body);
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

export const removeAllItem = async (req, res, next) => {
  try {
    const items = await removeAll(req.body.collection);
    return res.json(items);
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