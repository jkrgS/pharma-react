import { _terms } from '../../models/interfaces/ITerms';
import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  terms: _terms,
  loading: false,
};

const fetchTermData = (state, action) => {
  return updateObject(state, { loading: true });
};

const termDataSuccess = (state, action) => {
  return updateObject(state, {
    terms: action.termsData,
    total_elements: action.total_elements,
    loading: false,
    columns: action.columns,
  });
};

const termDataFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const modalStatus = (state, action) => {
  return updateObject(state, {
    modal: { ...action },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TERM_DATA_FETCH:
      return fetchTermData(state, action);
    case actionTypes.TERM_DATA_SUCCESS:
      return termDataSuccess(state, action);
    case actionTypes.TERM_DATA_FAIL:
      return termDataFail(state, action);
    case actionTypes.MODAL_STATUS:
      return modalStatus(state, action);
    default:
      return state;
  }
};

export default reducer;
