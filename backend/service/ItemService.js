import { Sequelize } from 'sequelize';
import Item from '../models/ItemModel.js';
import Collection from '../models/CollectionModel.js';
import algolia from '../algolia/Aligolia.js';
import Field from '../models/FieldModel.js';
import Tag from '../models/TagModel.js';

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

export const getTagItems = async (tag) => {
  const tagsData = await Tag.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('item')), 'item'],
    ],
    where: {
      name: tag
    },
  });
  let itemsId = [];
  for(let tag of tagsData) {
    itemsId.push(tag.dataValues.item)
  }
  const itemsData = await Item.findAll({
    where: {
      id: itemsId
    }
  })
  return itemsData;
}

export const getFour = async () => {
  const itemData = await Item.findAll({
    limit: 4,
    order: [ ['id', 'DESC' ]],
  });
  for (let index = 0; index < itemData.length; index++) {
    const fields = await Field.findAll({
      where: {
        item: itemData[index].dataValues.id
      }
    })
    itemData[index].dataValues.optionFields = fields.map(field =>{
      return {name: field.name, value: field.value}
    })
  }
  return itemData;
}

export const create = async (item) => {
  const itemData = await Item.create(item);
  await changeCollectionItemCount(itemData.collection);
  setTimeout(() => createAlgoliaObject(itemData), 1000*30);
  return itemData;
}

const changeCollectionItemCount = async (id) => {
  const itemCount = await Item.count( {
    where: {
      collection: id
    }
  });
  const collection = await Collection.update({item_count: itemCount}, {
    where: {
      id: id
    }
  });
  return collection;
}

const createAlgoliaObject = async (itemData) => {
  const collection = await Collection.findOne({
    where: {
      id: itemData.collection,
    }
  });
  const fields = await Field.findAll({
    where: {
      item: itemData.id
    }
  });
  const tags = await Tag.findAll({
    where: {
      item: itemData.id
    }
  });
  const algoliaItem = {
    objectID: itemData.id,
    name: itemData.name,
    description: collection.comment,
    topic: collection.topic,
    optionFields: [],
    tags: [],
    comments: [],
  }
  fields.forEach( field => {
    algoliaItem.optionFields.push(field.dataValues.value);
  })
  tags.forEach( tag => {
    algoliaItem.tags.push(tag.dataValues.name);
  })
  algolia.saveObjects([algoliaItem]);
}

export const update = async (item, id) => {
  const itemData = await Item.update(item, {
    where: {
      id: id
    }
  });
  return itemData;
}

export const removeAll = async (id) => {
  const itemData = await Item.destroy({
    where: {
      collection: id
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