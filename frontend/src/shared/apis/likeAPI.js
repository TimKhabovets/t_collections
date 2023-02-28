import $api from "../https";
import urls from '../constants/urls'

const curl = '/like';

export const addLike = async (like) => {
  try {
    const response = await $api.post(curl+urls.ADD, like);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const removeLike = async (like) => {
  try {
    const response = await $api.post(curl+urls.REMOVE, like );
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getLike = async (like) => {
  try {
    const response = await $api.post(curl+urls.GET, like);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}
