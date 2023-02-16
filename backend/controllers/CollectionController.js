import { getOne, getAll, create, update, remove } from '../service/CollectionService.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await getOne(req.params.id);
    return res.json(collection);
  }
  catch (err) {
    next(err);
  }
}

export const getAllCollections = async (req, res, next) => {
  try {
    const collections = await getAll();
    return res.json(collections);
  }
  catch (err) {
    next(err);
  }
}

export const addCollection = async (req, res, next) => {
  try {
    const {name, topic, comment, option_fields, photo, author} = req.body;
    const collection = await create(name, topic, comment, option_fields, photo, author);
    return res.json(collection);
  }
  catch (err) {
    next(err);
  }
}

export const updateCollection = async (req, res, next) => {
  try {
    const {collection} = req.body;
    const collectionDate = await update(collection);
    return res.json(collectionDate);
  }
  catch (err) {
    next(err);
  }
}

export const removeCollection = async (req, res, next) => {
    try {
      const { id } = req.params.id
      const collections = await remove(id);
      return res.json(collections);
    }
    catch (err) {
      next(err);
    }
  }