import { _user } from '../../models/interfaces/IAuth';
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  verifyUser as verifyUserService,
  forgotUser as forgotUserService,
  resetUser as resetUserService,
} from '../../services/auth';
import * as actionTypes from './actionTypes';
import { snackbar } from './term';

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

export const verifyUserSuccess = (data) => {
  return {
    type: actionTypes.VERIFY_USER_SUCCESS,
    data,
  };
};

export const verifyUserFail = (data) => {
  return {
    type: actionTypes.VERIFY_USER_FAIL,
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
      .then(({ data }) => {
        dispatch(registerUserSuccess(data.message));
        dispatch(snackbar(true, 'success', data.message));
      })
      .catch(({ response }) => {
        const { message } = response.data;

        dispatch(registerUserFail(message));
        dispatch(snackbar(true, 'error', message));
      });
  };
};

export const loginUser = (user = _user) => {
  const { email, password } = user;
  const loginData = { email, password };
  return (dispatch) => {
    loginUserService(loginData)
      .then(({ data }) => {
        dispatch(loginUserSuccess(data));
        dispatch(snackbar(true, 'success', 'You are logged in'));
      })
      .catch(({ response }) => {
        const { message } = response.data;

        dispatch(loginUserFail(message));
        dispatch(snackbar(true, 'error', message));
      });
  };
};

export const verifyUser = (token) => {
  return (dispatch) => {
    verifyUserService(token)
      .then(({ data }) => {
        dispatch(verifyUserSuccess(data));
        dispatch(snackbar(true, 'success', data.message));
      })
      .catch(({ response }) => {
        const { message } = response.data;

        dispatch(verifyUserFail(message));
        dispatch(snackbar(true, 'error', message));
      });
  };
};

export const forgotUser = (email) => {
  return (dispatch) => {
    forgotUserService(email)
      .then(({ data }) => {
        dispatch(forgotUserSuccess(data));
        dispatch(snackbar(true, 'success', data.message));
      })
      .catch(({ response }) => {
        const { message } = response.data;

        dispatch(forgotUserFail(message));
        dispatch(snackbar(true, 'error', message));
      });
  };
};

export const resetUser = (user = _user) => {
  const { token, password, confirmPassword } = user;
  return (dispatch) => {
    resetUserService({ token, password, confirmPassword })
      .then(({ data }) => {
        dispatch(resetUserSuccess(data));
        dispatch(snackbar(true, 'success', data.message));
      })
      .catch(({ response }) => {
        const { message } = response.data;
        dispatch(resetUserFail(message));
        dispatch(snackbar(true, 'error', message));
      });
  };
};
