import Collection from '../models/CollectionModel.js';

export const getOne = async (id) => {
  const collectionData = await Collection.findOne({id});
  return collectionData;
}

export const getAll = async () => {
  const collectionsData = await Collection.findAll();
  return collectionsData;
}

export const create = async (name, topic, comment, option_fields, photo, author) => {
  const collectionData = await Collection.create({name, topic, comment, option_fields, photo, author});
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