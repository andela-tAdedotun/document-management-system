import axios from 'axios';
import setCurrentUser from './AuthActions';

export const updateUser = (userId, userData, isAdmin) =>
  dispatch => axios.put(`/api/users/${userId}`, userData)
  .then((res) => {
    const currentUserDetails = {};
    currentUserDetails.name = res.data.name;
    currentUserDetails.email = res.data.email;
    currentUserDetails.id = res.data.id;
    currentUserDetails.roleId = res.data.RoleId;
    if (isAdmin) {
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
  .catch((res) => {
    if (!isAdmin) {
      if (res.data.type && res.data.type === 'Invalid password') {
        throw new Error(res.data.message);
      }
    }
  });

export const getUsers = (offset, limit) =>
  dispatch => axios.get(`/api/users/?offset=${offset}&limit=${limit}`)
  .then((res) => {
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
  })
  .catch((res) => {
    throw new Error(res.data);
  });

export const createUser = userData =>
  dispatch => axios.post('/api/users', userData).then((res) => {
    dispatch({
      type: 'CREATE_NEW_USER',
      createdUser: res.data.user
    });
  });
