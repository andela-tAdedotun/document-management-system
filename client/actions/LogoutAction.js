import axios from 'axios';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import types from './Types';

const LogoutAction = () =>
  dispatch =>
    axios.post('/api/users/logout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch({
        type: types.USER_LOGOUT
      });
    });

export default LogoutAction;
