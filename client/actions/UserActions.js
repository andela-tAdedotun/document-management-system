import axios from 'axios';
import setCurrentUser from './AuthActions';
import types from './types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/dispatchHelper';

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
      dispatchAction(dispatch,
        {
          type: types.ADMIN_UPDATE_USER,
          updatedUser: res.data,
          userId
        }
      );
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
  dispatch =>
    buildDispatchWithGet(dispatch,
      `/api/users/?offset=${offset}&limit=${limit}`,
      types.GET_ALL_USERS, 'allUsers');

export const deleteUser = userId =>
  dispatch => axios.delete(`/api/users/${userId}`).then(() => {
    dispatchAction(dispatch,
      {
        type: types.DELETE_USER,
        userId
      });
  })
  .catch((res) => {
    throw new Error(res.data);
  });

export const createUser = userData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/users', userData,
    types.CREATE_NEW_USER, 'createdUser', 'user');
