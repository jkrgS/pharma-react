import axios from 'axios';

export const getTerms = async (page = 1, size = 10) => {
  return await axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/getTerms`,
    {
      params: { from: page, size },
    }
  );
};
