import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import validator from 'validator';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './AuthActions';

const userLogin = userData =>
  dispatch => axios.post('/api/users/login', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((res) => {
    Materialize.toast(res.data, 4000);
  });

export default userLogin;
