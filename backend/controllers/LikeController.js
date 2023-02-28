import { getOne, create, remove } from '../service/LikeService.js';

export const getLike = async (req, res, next) => {
  try {
    const like = await getOne(req.body.item, req.body.user);
    return res.json(like);
  }
  catch (err) {
    next(err);
  }
}

export const addLike = async (req, res, next) => {
  try {
    const like = await create(req.body.user, req.body.item);
    return res.json(like);
  }
  catch (err) {
    next(err);
  }
}

export const removeLike = async (req, res, next) => {
  try {
    const like = await remove(req.body.user, req.body.item);
    return res.json(like);
  }
  catch (err) {
    next(err);
  }
}