import axios from "axios";
import urls from '../constants/urls';
import $api from "../https";

export const toSignUp = async (data) => {
  try {
    const response = await $api.post(urls.SIGNUP, data);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const getUsers = async () => {
  const response = await $api.get(urls.USERS);
  return response.data;
}

export const getUserName = async (id) => {
  const response = await $api.get(urls.USERNAME +'/'+ id);
  return response.data;
}


export const toLogIn = async (data) => {
  try {
    const response = await $api.post(urls.LOGIN, data);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const logOut = async () => {
  try {
    const response = await $api.post(urls.LOGOUT);
    localStorage.removeItem('token');
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const checkAuth = async () => {
  try {
    const response = await $api.get(urls.REFRESH);
    localStorage.setItem('token', response.data.accessToken);
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
} 

export const removeUser = async (id) => {
  try {
    const response = await $api.delete(urls.USERS + '/' + id);;
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}

export const updateUser = async (data, id) => {
  try {
    const response = await $api.patch(urls.USERS + '/' + id, data);;
    return response;
  }
  catch (err) {
    console.log(err.response?.data?.massage);
  }
}