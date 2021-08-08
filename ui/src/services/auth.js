import axios from 'axios';
import { _user } from '../models/interfaces/IAuth';

export const registerUser = async (user = _user) => {
  return axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/register`, {
    ...user,
  });
};

export const loginUser = async (user = _user) => {
  return axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`, {
    ...user,
  });
};

export const verifyUser = async (token) => {
  console.log({ token });
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/auth/verify-email`,
    {
      token,
    }
  );
};

export const forgotUser = async (user = _user) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/auth/forgot-password`,
    {
      ...user,
    }
  );
};

export const resetUser = async (user = _user) => {
  return axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/auth/reset-password`,
    {
      ...user,
    }
  );
};
