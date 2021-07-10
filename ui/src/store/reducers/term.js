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

const editTermSuccess = (state, action) => {
  return updateObject(state, {
    terms: state.terms.map((term) => {
      return term.key === action.editTerm.key
        ? { ...term, ...action.editTerm }
        : term;
    }),
  });
};

const editTermFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const deleteTermSuccess = (state, action) => {
  console.log({ action });
  return updateObject(state, {
    terms: state.terms.filter((term) => term.key !== action.deleteTerm.key),
  });
};

const deleteTermFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const modalStatus = (state, action) => {
  const { status, onDelete, term } = action;
  return updateObject(state, {
    modal: { status, onDelete, term },
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
    case actionTypes.EDIT_TERM_SUCCESS:
      return editTermSuccess(state, action);
    case actionTypes.EDIT_TERM_FAIL:
      return editTermFail(state, action);
    case actionTypes.DELETE_TERM_SUCCESS:
      return deleteTermSuccess(state, action);
    case actionTypes.DELETE_TERM_FAIL:
      return deleteTermFail(state, action);
    case actionTypes.MODAL_STATUS:
      return modalStatus(state, action);
    default:
      return state;
  }
};

export default reducer;
