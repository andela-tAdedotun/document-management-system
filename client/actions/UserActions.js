import axios from 'axios';
import setCurrentUser from './SetCurrentUser';
import types from './Types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/DispatchHelper';
import logUserOut from './LogoutAction';

/**
 * updateUser - edits documents
 *
 * @param  {object} userDetails - old data of user
 * @param  {object} userData - data to edit user with
 * @param  {boolean} isAdmin - specifies if admin if update is from admin
 * dashboard page
 * @return {Promise}       axios ajax call to backend
 */
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

/**
 * displayDocuments - gets documents to be put in store
 *
 * @param  {integer} offset - offset for pagination
 * @param  {integer} limit - limit for pagination
 * @return {Promise}       axios ajax call to backend
 */
export const getUsers = (offset, limit) =>
  dispatch =>
    buildDispatchWithGet(dispatch,
      `/api/users/?offset=${offset}&limit=${limit}`,
      types.GET_ALL_USERS, 'allUsers');

/**
 * deleteUser - deletes users
 *
 * @param  {integer} userId - id of user to be deleted
 * @return {Promise}       axios ajax call to backend
 */
export const deleteUser = userId =>
  dispatch => axios.delete(`/api/users/${userId}`).then(() => {
    dispatchAction(dispatch,
      {
        type: types.DELETE_USER,
        userId
      });
  });

/**
 * createUser - creates users to be put in store
 *
 * @param  {object} userData - user to be created
 * @return {Promise}       axios ajax call to backend
 */
export const createUser = userData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/users/create', userData,
    types.CREATE_NEW_USER, 'createdUser', 'user');
