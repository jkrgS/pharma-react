import { _user } from '../../models/interfaces/IAuth';
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  forgotUser as forgotUserService,
  resetUser as resetUserService,
} from '../../services/auth';
import * as actionTypes from './actionTypes';

export const registerUserSuccess = (message) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    message,
  };
};

export const registerUserFail = (message) => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    message,
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    data,
  };
};

export const loginUserFail = (data) => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    data,
  };
};

export const forgotUserSuccess = (data) => {
  return {
    type: actionTypes.FORGOT_USER_SUCCESS,
    data,
  };
};

export const forgotUserFail = (data) => {
  return {
    type: actionTypes.FORGOT_USER_FAIL,
    data,
  };
};

export const resetUserSuccess = (data) => {
  return {
    type: actionTypes.RESET_USER_SUCCESS,
    data,
  };
};

export const resetUserFail = (data) => {
  return {
    type: actionTypes.RESET_USER_FAIL,
    data,
  };
};

export const registerUser = (user = _user) => {
  return (dispatch) => {
    registerUserService(user)
      .then(({ data }) => dispatch(registerUserSuccess(data.message)))
      .catch(({ error }) => dispatch(registerUserFail(error)));
  };
};

export const loginUser = (user = _user) => {
  const { email, password } = user;
  const loginData = { email, password };
  return (dispatch) => {
    loginUserService(loginData)
      .then(({ data }) => dispatch(loginUserSuccess(data)))
      .catch(({ error }) => dispatch(loginUserFail(error)));
  };
};

export const forgotUser = (user = _user) => {
  return (dispatch) => {
    forgotUserService(user)
      .then(({ data }) => dispatch(forgotUserSuccess(data)))
      .catch(({ error }) => dispatch(forgotUserFail(error)));
  };
};

export const resetUser = (user = _user) => {
  return (dispatch) => {
    resetUserService(user)
      .then(({ data }) => dispatch(resetUserSuccess(data)))
      .catch(({ error }) => dispatch(resetUserFail(error)));
  };
};
