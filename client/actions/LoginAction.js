import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './Types';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './SetCurrentUser';

/**
 * putTokenInLocalStorage - puts JWT token in localStorage
 *
 * @param  {string} token - user's JWT token
 * @return {Promise}       axios ajax call to backend
 */
const putTokenInLocalStorage = (token) => {
  localStorage.setItem('jwtToken', token);
};

/**
 * LoginAction - action triggered when user tries to log in
 *
 * @param  {object} userData - data of user trying to log in
 * @return {Promise}       axios ajax call to backend
 */
const LoginAction = userData =>
  dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    putTokenInLocalStorage(token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch(res =>
    dispatch({
      type: types.LOGIN_FAILURE,
      message: res.data.message
    })
  );

export default LoginAction;
