import axios from 'axios';
import { browserHistory } from 'react-router';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import types from './types';

const logUserOut = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: types.USER_LOGOUT
    });
    axios.post('/api/users/logout').then(() => {
      browserHistory.push('/');
    });
  };
};

export default logUserOut;
