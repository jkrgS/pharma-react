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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_SUCCESS:
      return registerUserSuccess(state, action);
    case actionTypes.REGISTER_USER_FAIL:
      return registerUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
