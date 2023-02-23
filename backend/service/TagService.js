import Tag from '../models/TagModel.js';

export const getAll = async (item) => {
  const tagData = await Tag.findAll({
    where: {
      item
    }
  });
  return tagData;
}

export const create = async (tag) => {
  const tagData = await Tag.create(tag);
  return tagData;
}

export const update = async (tag, id) => {
  const tagData = await Tag.update(tag, {
    where: {
      id: id
    }
  });
  return tagData;
}

export const remove = async (id) => {
  const tagData = await Tag.destroy({
    where: {
      item: id
    }
  });
  return tagData;
}

export const removeOne = async (tag) => {
  const tagData = await Tag.destroy({
    where: {
      name: tag.name,
      item: tag.item
    }
  });
  return tagData;
}