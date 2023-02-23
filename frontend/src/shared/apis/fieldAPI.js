import $api from "../https";
import urls from '../constants/urls'

const curl = '/field';

export const addField = async (data) => {
  try {
    const response = await $api.post(curl+urls.ADD, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const removeField = async (id) => {
  try {
    const response = await $api.delete(curl+urls.REMOVE+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const updateField = async (data) => {
  try {
    const id = data.id;
    const response = await $api.patch(curl+urls.UPDATE+id, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getAllFields = async (item) => {
  try {
    const response = await $api.post(curl+urls.ALL, {item});
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}