import { getAll, create, update, remove, removeOne, getTwenty } from '../service/TagService.js';

export const getAllItemTags = async (req, res, next) => {
  try {
    const tag = await getAll(req.body.item);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}

export const getTwentyTags = async (req, res, next) => {
  try {
    const tags = await getTwenty();
    return res.json(tags);
  }
  catch (err) {
    next(err);
  }
}

export const addTag = async (req, res, next) => {
  try {
    const tag = await create(req.body);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}

export const updateTag = async (req, res, next) => {
  try {
    const tag = req.body;
    const tagDate = await update(tag, req.params.id);
    return res.json(tagDate);
  }
  catch (err) {
    next(err);
  }
}

export const removeTag = async (req, res, next) => {
  try {
    const tag = await remove(req.params.id);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}

export const removeOneTag = async (req, res, next) => {
  try {
    const tag = await removeOne(req.body);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}