import Photo from '../models/PhotoModel.js';

export const getOne = async (id) => {
  const photoData = await Photo.findOne({
    where: {
      id: id,
    }
  });
  return photoData;
}

export const create = async (url) => {
  const photoData = await Photo.create({url});
  return photoData;
}

export const update = async (url, id) => {
  const photoData = await Photo.update({url}, {
    where: {
      id: id
    }
  });
  return photoData;
}

export const remove = async (id) => {
  const photoData = await Photo.destroy({
    where: {
      id: id
    }
  });
  return photoData;
}