import axios from "axios";
import $api from "../https";
import urls from '../constants/urls'

const curl = '/photo';

export const addPhoto = async (url) => {
  try {
    const response = await $api.post(curl+urls.ADD, {url});
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const removePhoto = async (id) => {
  try {
    const response = await $api.delete(curl+urls.REMOVE+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const updatePhoto = async (data) => {
  try {
    const id = data.id;
    const response = await $api.patch(curl+urls.UPDATE+id, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getPhoto = async (id) => {
  try {
    const response = await $api.get(curl+urls.GET+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}
