import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './Types';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './SetCurrentUser';

const putTokenInLocalStorage = (token) => {
  localStorage.setItem('jwtToken', token);
};

const LoginAction = userData =>
  dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    putTokenInLocalStorage(token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((res) => {
    dispatch({
      type: types.LOGIN_FAILURE,
      message: res.data.message
    });
  });

export default LoginAction;
