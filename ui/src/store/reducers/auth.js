import { _auth } from '../../models/interfaces/IAuth';
import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  auth: _auth,
};

const registerUserSuccess = (state, action) => {
  return updateObject(state, {
    auth: { register: { message: action.message } },
  });
};

const registerUserFail = (state, action) => {
  return updateObject(state, {
    auth: { register: { message: action.message, failed: true } },
  });
};

const loginUserSuccess = (state, action) => {
  localStorage.setItem('token', action?.data?.token);
  return updateObject(state, {
    auth: { login: { email: action?.data?.email, token: action?.data?.token } },
  });
};

const loginUserFail = (state, action) => {
  return updateObject(state, {
    auth: { login: { failed: true } },
  });
};

const verifyUserSuccess = (state, action) => {
  const { message } = action;
  return updateObject(state, {
    auth: { verify: { message } },
  });
};

const verifyUserFail = (state, action) => {
  const { message } = action;
  return updateObject(state, {
    auth: { verify: { failed: true, message } },
  });
};

const forgotUserSuccess = (state, action) => {
  return updateObject(state, {
    auth: { forgot: { message: action.message } },
  });
};

const forgotUserFail = (state, action) => {
  return updateObject(state, {
    auth: { forgot: { message: action.message, failed: true } },
  });
};

const resetUserSuccess = (state, action) => {
  return updateObject(state, {
    auth: { reset: { message: action.message } },
  });
};

const resetUserFail = (state, action) => {
  return updateObject(state, {
    auth: { reset: { message: action.message, failed: true } },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return registerUserSuccess(state, action);
    case actionTypes.REGISTER_USER_FAIL:
      return registerUserFail(state, action);
    case actionTypes.LOGIN_USER_SUCCESS:
      return loginUserSuccess(state, action);
    case actionTypes.LOGIN_USER_FAIL:
      return loginUserFail(state, action);
    case actionTypes.VERIFY_USER_SUCCESS:
      return verifyUserSuccess(state, action);
    case actionTypes.VERIFY_USER_FAIL:
      return verifyUserFail(state, action);
    case actionTypes.FORGOT_USER_SUCCESS:
      return forgotUserSuccess(state, action);
    case actionTypes.FORGOT_USER_FAIL:
      return forgotUserFail(state, action);
    case actionTypes.RESET_USER_SUCCESS:
      return resetUserSuccess(state, action);
    case actionTypes.RESET_USER_FAIL:
      return resetUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
