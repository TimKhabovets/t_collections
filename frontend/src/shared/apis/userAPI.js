import axios from "axios";
import urls from '../constants/urls';

export const toSignUp = (data) => {
  axios.post(urls.USERS, data);
}

export const getUsers = async () => {
    const response = await axios.get(urls.USERS);
    return response.data;
}