import Collection from '../models/CollectionModel.js';

export const getOne = async (id) => {
  const collectionData = await Collection.findOne({
    where: {
      id: id,
    }
  });
  return collectionData;
}

export const getAll = async (author) => {
  const collectionsData = await Collection.findAll({
    where: {
      author: author
    }
  });
  return collectionsData;
}

export const getFour = async () => {
  const collectionData = await Collection.findAll({
    limit: 4,
    order: [ ['item_count', 'DESC']],
  });
  return collectionData;
}

export const create = async (name, topic, markdown, option_fields, photo, author) => {
  const collectionData = await Collection.create({name, topic, comment: markdown, option_fields, photo, author});
  return collectionData;
}

export const update = async (collection, id) => {
  const collectionData = await Collection.update(collection, {
    where: {
      id: id
    }
  });
  return collectionData;
}

export const remove = async (id) => {
  const collectionData = await Collection.destroy({
    where: {
      id: id
    }
  });
  return collectionData;
}