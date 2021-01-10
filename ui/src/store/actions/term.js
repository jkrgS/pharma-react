import { _tables } from '../../models/interfaces/ITables';
import { _terms } from '../../models/interfaces/ITerms';
import { getTerms } from '../../services/terms';
import * as actionTypes from './actionTypes';

export const termDataSuccess = (terms = _terms, total) => {
  return {
    type: actionTypes.TERM_DATA_SUCCESS,
    termsData: terms,
    total_elements: total,
  };
};

export const termDataFail = (error) => {
  return {
    type: actionTypes.TERM_DATA_FAIL,
    error,
  };
};

export const fetchTermDataStart = () => {
  return { type: actionTypes.TERM_DATA_FETCH };
};

export const fetchTermData = (page = _tables.page) => {
  return (dispatch) => {
    dispatch(fetchTermDataStart());

    getTerms(page.current, page.size)
      .then(({ data }) => {
        const terms = data._embedded.terms.map((term) => {
          return {
            key: term.obo_id,
            label: term.label,
            synonyms: term.synonyms ? term.synonyms.join(', ') : '-',
            obo_id: term.obo_id,
            term_editor: term.annotation['term editor']
              ? term.annotation['term editor'].join(', ')
              : '-',
            has_children: term.has_children,
          };
        });

        dispatch(termDataSuccess(terms, data.page.totalElements));
      })
      .catch((e) => dispatch(termDataFail(e)));
  };
};
