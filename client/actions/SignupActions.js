import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './AuthActions';
// import Validator from 'validator';

const userSignup = (userData) => {
  // if (!Validator.isEmail(userData.email)) {
  //   return 'Email is not valid. Cannot proceed.';
  // }
  return dispatch => axios.post('/api/users', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  })
  .catch((res) => { throw new Error(res.data); });
};

export default userSignup;
