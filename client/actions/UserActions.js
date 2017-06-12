import axios from 'axios';
import setCurrentUser from './SetCurrentUser';
import types from './Types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/DispatchHelper';
import logUserOut from './LogoutAction';

export const updateUser = (userDetails, userData, isAdmin) =>
  dispatch => axios.put(`/api/users/${userDetails.id}`, userData)
  .then((res) => {
    if (res.data.email !== userDetails.email) {
      return dispatch(logUserOut());
    }

    if (isAdmin) {
      delete res.data.password;
      dispatchAction(dispatch,
        {
          type: types.ADMIN_UPDATE_USER,
          updatedUser: res.data,
          userId: userDetails.id
        }
      );
    } else {
      dispatch(setCurrentUser(res.data));
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
  });

export const createUser = userData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/users/create', userData,
    types.CREATE_NEW_USER, 'createdUser', 'user');
