import $api from "../https";
import urls from '../constants/urls'

const curl = '/comment';

export const addComment = async (data) => {
  try {
    const response = await $api.post(curl+urls.ADD, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getAllComments = async (item) => {
  try {
    const response = await $api.get(curl+urls.ALL+'/'+item);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}