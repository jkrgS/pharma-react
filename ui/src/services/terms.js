import axios from 'axios';
import { _term } from '../models/interfaces/ITerms';

export const getTerms = async (page = 1, size = 10) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/getTerms`,
    {
      params: { from: page, size },
    }
  );
};

export const editTerm = async (term = _term) => {
  return await axios.put(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/editTerm`,
    { term }
  );
};

export const deleteTerm = async (term = _term) => {
  return await axios.delete(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/deleteTerm/${term.key}`
  );
};
