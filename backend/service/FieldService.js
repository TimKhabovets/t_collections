import Field from '../models/FieldModel.js';

export const getAll = async (collection) => {
  const fieldData = await Field.findAll({
    where: {
      collection
    }
  });
  return fieldData;
}

export const create = async () => {
  const fieldData = await Field.create();
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
      id: id
    }
  });
  return fieldData;
}