import axios from "axios";
import $api from "../https";
import urls from '../constants/urls'

const curl = '/collection';

export const addCollection = async (data) => {
  try {
    const response = await $api.post(curl+urls.ADD, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const removeCollection = async (data) => {
  try {
    const id = data.id;
    const response = await $api.delete(curl+urls.REMOVE+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const updateCollection = async (data) => {
  try {
    const id = data.id;
    const response = await $api.delete(curl+urls.UPDATE+id, data);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getCollection = async (id) => {
  try {
    const response = await $api.get(curl+urls.COLLECTION+id);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getAllCollections = async (author) => {
  try {
    const response = await $api.post(curl+urls.ALL, {author});
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}