import Comment from '../models/CommentModel.js';
import algolia from '../algolia/Aligolia.js';

export const getAll = async (item) => {
  const commentData = await Comment.findAll({
    where: {
      item
    }
  });
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
