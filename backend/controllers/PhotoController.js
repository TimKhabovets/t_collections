import { getOne, create, update, remove } from '../service/PhotoService.js';

export const getPhoto = async (req, res, next) => {
  try {
    const photo = await getOne(req.params.id);
    return res.json(photo);
  }
  catch (err) {
    next(err);
  }
}

export const addPhoto = async (req, res, next) => {
  try {
    const { url } = req.body;
    const photo = await create(url);
    return res.json(photo);
  }
  catch (err) {
    next(err);
  }
}

export const updatePhoto = async (req, res, next) => {
  try {
    const photo = req.body;
    const photoDate = await update(item, req.params.id);
    return res.json(photoDate);
  }
  catch (err) {
    next(err);
  }
}

export const removePhoto = async (req, res, next) => {
  try {
    const photo = await remove(req.params.id);
    return res.json(photo);
  }
  catch (err) {
    next(err);
  }
}