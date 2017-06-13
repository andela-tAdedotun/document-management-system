import axios from 'axios';

/**
 * setAuthorizationToken- sets authorization tokens in headers
 *
 * @param  {string} token - token of authenticated user
 * @return {void} - none
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
