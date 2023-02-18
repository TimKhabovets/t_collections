import Collection from '../models/CollectionModel.js';

export const getOne = async (id) => {
  const collectionData = await Collection.findOne({id});
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

export const create = async (name, topic, markdown, option_fields, photo, author) => {
  const collectionData = await Collection.create({name, topic, comment: markdown, option_fields, photo, author});
  return collectionData;
}

export const update = async (collection) => {
  const collectionData = await Collection.update(collection, {
    where: {
      id: collection.id
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