import Comment from '../models/CommentModel.js';
import User from '../models/UserModel.js';
import algolia from '../algolia/Aligolia.js';
import { log } from 'console';

export const getAll = async (item) => {
  const commentData = await Comment.findAll({
    where: {
      item
    }
  });
  for (let index = 0; index < commentData.length; index++) {
    const user = await User.findOne({
      where: {
        id: commentData[index].dataValues.user
      }
    })
    commentData[index].dataValues.user = user.dataValues.name;
    commentData[index]._previousDataValues.user = user.dataValues.name;
  }
  return commentData;
}

export const create = async (comment) => {
  const commentData = await Comment.create(comment);
  const commentsData = await Comment.findAll({
    where: {
      item: commentData.item,
    }
  });
  const algoliaItem = {
    objectID: itemData.id,
    comments: [],
  }
  commentsData.forEach( comment => {
    algoliaItem.comments.push(comment.dataValues.text);
  })
  algolia.partialUpdateObjects([algoliaItem]);
  return commentData;
}
