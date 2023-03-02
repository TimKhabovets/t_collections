import Like from '../models/LikeModel.js';

export const getOne = async (item, user) => {
  const likeData = await Like.findOne({
    where: {
      user: user,
      item: item
    }
  });
  return likeData;
}

export const create = async (user, item) => {
  const likeData = await Like.create({user: user, item: item});
  return likeData;
}

export const remove = async (user, item) => {
  const likeData = await Like.destroy({
    where: {
      user: user,
      item: item
    }
  });
  return likeData;
}