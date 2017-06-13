import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import types from './Types';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import setCurrentUser from './SetCurrentUser';

/**
 * SignupAction - action triggered when user tries to signup up
 *
 * @param  {object} userData - data of user trying to sign up
 * @return {Promise}       axios ajax call to backend
 */
const SignupAction = userData =>
  dispatch => axios.post('/api/users', userData).then((res) => {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
    browserHistory.push('/documents');
  })
  .catch((res) => {
    dispatch({
      type: types.SIGNUP_FAILURE,
      message: res.data.message
    });
  });

export default SignupAction;
