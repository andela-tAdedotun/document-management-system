import axios from 'axios';
import setCurrentUser from './AuthActions';

export const updateUser = (userId, userData, isNotSelf) =>
  dispatch => axios.put(`/api/users/${userId}`, userData)
  .then((res) => {
    const currentUserDetails = {};
    currentUserDetails.name = res.data.name;
    currentUserDetails.email = res.data.email;
    currentUserDetails.id = res.data.id;
    currentUserDetails.roleId = res.data.RoleId;
    if (isNotSelf) {
      delete res.data.password;
      dispatch({
        type: 'ADMIN_UPDATE_USER',
        updatedUser: res.data,
        userId
      });
    } else {
      dispatch(setCurrentUser(currentUserDetails));
    }
  })
  .catch(() => 'Invalid parameters');

export const getUsers = () =>
  dispatch => axios.get('/api/users').then((res) => {
    dispatch({
      type: 'GET_ALL_USERS',
      allUsers: res.data
    });
  });

export const deleteUser = userId =>
  dispatch => axios.delete(`/api/users/${userId}`).then(() => {
    dispatch({
      type: 'DELETE_USER',
      userId
    });
  });

export const createUser = userData =>
  dispatch => axios.post('/api/users', userData).then((res) => {
    dispatch({
      type: 'CREATE_NEW_USER',
      createdUser: res.data.user
    });
  });
