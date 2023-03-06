import $api from "../https";
import urls from '../constants/urls'

const curl = '/item';

export const addItem = async (data) => {
  try {
    const response = await $api.post(curl+urls.ADD, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const addItemToAlgolia = async (data) => {
  try {
    const response = await $api.post(curl+urls.ADDALGOLIA, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const removeItem = async (id) => {
  try {
    const response = await $api.delete(curl+urls.REMOVE+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const updateItem = async (data, id) => {
  try {
    const response = await $api.patch(curl+urls.UPDATE+id, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getItem = async (id) => {
  try {
    const response = await $api.get(curl+urls.GET+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getAllItems = async (collection) => {
  try {
    const response = await $api.post(curl+urls.ALL, {collection});
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getFourItems = async () => {
  try {
    const response = await $api.get(curl+urls.GETFOUR);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getTagItems = async (tag) => {
  try {
    const response = await $api.get(curl+urls.GETBYTAG + '/'+tag);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}