import { getOne, getAll, create, update, remove, getFour } from '../service/CollectionService.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await getOne(req.params.id);
    return res.json(collection);
  }
  catch (err) {
    next(err);
  }
}

export const getAllUserCollections = async (req, res, next) => {
  try {
    const collections = await getAll(req.body.author);
    return res.json(collections);
  }
  catch (err) {
    next(err);
  }
}

export const getFourCollection = async (req, res, next) => {
  try {
    const items = await getFour();
    return res.json(items);
  }
  catch (err) {
    next(err);
  }
}

export const addCollection = async (req, res, next) => {
  try {
    const { name, topic, markdown, option_fields, photo, author } = req.body;
    const collection = await create(name, topic, markdown, option_fields, photo, author);
    return res.json(collection);
  }
  catch (err) {
    next(err);
  }
}

export const updateCollection = async (req, res, next) => {
  try {
    const collection = req.body;
    const collectionDate = await update(collection, req.params.id);
    return res.json(collectionDate);
  }
  catch (err) {
    next(err);
  }
}

export const removeCollection = async (req, res, next) => {
  try {
    const collections = await remove(req.params.id);
    return res.json(collections);
  }
  catch (err) {
    next(err);
  }
}