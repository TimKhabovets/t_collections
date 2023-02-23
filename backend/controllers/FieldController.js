import { getAll, create, update, remove } from '../service/FieldService.js';

export const getAllItemFields = async (req, res, next) => {
  try {
    const fields = await getAll(req.body.author);
    return res.json(fields);
  }
  catch (err) {
    next(err);
  }
}

export const addField = async (req, res, next) => {
  try {
    //const { } = req.body;
    const field = await create();
    return res.json(field);
  }
  catch (err) {
    next(err);
  }
}

export const updateField = async (req, res, next) => {
  try {
    const field = req.body;
    const fieldDate = await update(field, req.params.id);
    return res.json(fieldDate);
  }
  catch (err) {
    next(err);
  }
}

export const removeField = async (req, res, next) => {
  try {
    const field = await remove(req.params.id);
    return res.json(field);
  }
  catch (err) {
    next(err);
  }
}