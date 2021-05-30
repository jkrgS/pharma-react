import { _user } from '../../models/interfaces/IAuth';
import { registerUser as registerUserSrvice } from '../../services/auth';
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

export const registerUser = (user = _user) => {
  return (dispatch) => {
    registerUserSrvice(user)
      .then(({ data }) => dispatch(registerUserSuccess(data.message)))
      .catch(({ error }) => dispatch(registerUserFail(error)));
  };
};
