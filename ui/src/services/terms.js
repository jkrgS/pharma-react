import axios from 'axios';

export const getTerms = async (page = 1, size = 10) => {
  return await axios.get(
    `https://www.ebi.ac.uk/ols/api/ontologies/efo/terms?page=${page}&size=${size}`
  );
};
