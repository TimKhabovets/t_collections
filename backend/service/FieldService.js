import Field from '../models/FieldModel.js';

export const getAll = async (item) => {
  const fieldData = await Field.findAll({
    where: {
      item
    }
  });
  return fieldData;
}

export const create = async (item) => {
  const fieldData = await Field.create(item);
  return fieldData;
}

export const update = async (item, id) => {
  const fieldData = await Field.update(item, {
    where: {
      id: id
    }
  });
  return fieldData;
}

export const remove = async (id) => {
  const fieldData = await Field.destroy({
    where: {
      item: id
    }
  });
  return fieldData;
}