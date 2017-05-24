import axios from 'axios';
import { browserHistory } from 'react-router';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';

const logUserOut = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: 'USER_LOGOUT'
    });
    axios.post('/api/users/logout').then(() => {
      browserHistory.push('/');
    });
  };
};

export default logUserOut;
