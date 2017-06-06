import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import types from './Types';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './SetCurrentUser';

const LoginAction = userData =>
  dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
    browserHistory.push('/documents');
  })
  .catch((res) => {
    dispatch({
      type: types.LOGIN_FAILURE,
      message: res.data.message
    });
  });

export default LoginAction;
