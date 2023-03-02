import { getAll, create } from '../service/CommentService.js';

export const getAllItemComments = async (req, res, next) => {
  try {
    const tag = await getAll(req.params.item);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}

export const addComment = async (req, res, next) => {
  try {
    console.log(req.body);
    const tag = await create(req.body);
    return res.json(tag);
  }
  catch (err) {
    next(err);
  }
}