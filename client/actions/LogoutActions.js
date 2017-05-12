import axios from 'axios';
import { browserHistory } from 'react-router';
import setCurrentUser from './AuthActions';
// import displayUserDocuments from './DisplayUserDocumentsActions';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';

const logUserOut = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    // dispatch(setCurrentUser({}));
    // dispatch(displayUserDocuments({}));
    dispatch({
      type: 'USER_LOGOUT'
    });
    axios.post('/api/users/logout').then(() => {
      browserHistory.push('/');
    });
  };
};

export default logUserOut;
