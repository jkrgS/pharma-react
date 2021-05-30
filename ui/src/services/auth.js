import axios from 'axios';
import { _user } from '../models/interfaces/IAuth';

export const registerUser = async (user = _user) => {
  return axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/register`, {
    ...user,
  });
};
