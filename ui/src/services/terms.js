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

export const updateTerm = async (data = _term) => {
  return await axios.put(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/term/${data.key}`,
    {
      ...data,
    }
  );
};
