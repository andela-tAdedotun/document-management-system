import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './SetCurrentUser';

const LoginAction = userData =>
  dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((res) => {
    throw new Error(res.data);
  });

export default LoginAction;
