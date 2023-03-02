import Tag from '../models/TagModel.js';
import { Sequelize } from 'sequelize';

export const getAll = async (item) => {
  const tagData = await Tag.findAll({
    where: {
      item
    }
  });
  return tagData;
}

export const getTwenty = async () => {
  const tagData = await Tag.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
    ], 
    order: Sequelize.literal('rand()'),
    limit: 20,
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