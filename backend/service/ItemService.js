import Item from '../models/ItemModel.js';

export const getOne = async (id) => {
  const itemData = await Item.findOne({
    where: {
      id: id,
    }
  });
  return itemData;
}

export const getAll = async (collection) => {
  const itemData = await Item.findAll({
    where: {
      collection
    }
  });
  return itemData;
}

export const create = async (item) => {
  const itemData = await Item.create(item);
  return itemData;
}

export const update = async (item, id) => {
  const itemData = await Item.update(item, {
    where: {
      id: id
    }
  });
  return itemData;
}

export const remove = async (id) => {
  const itemData = await Item.destroy({
    where: {
      id: id
    }
  });
  return itemData;
}