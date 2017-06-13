import axios from 'axios';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import types from './Types';

/**
 * LogoutAction - action triggered when user tries to log out
 *
 * @param  {void}
 * @return {Promise}       axios ajax call to backend
 */
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
