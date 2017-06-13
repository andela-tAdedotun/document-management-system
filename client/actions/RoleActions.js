import axios from 'axios';
import types from './Types';
import { dispatchAction, buildDispatchWithPost, buildDispatchWithGet }
  from '../utilities/DispatchHelper';

/**
 * getRoles - gets all roles
 *
 * @param  {void}
 * @return {Promise}       axios ajax call to backend
 */
export const getRoles = () =>
  (dispatch) => {
    dispatchAction(dispatch, {
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: false,
        searchQuery: ''
      }
    });

    return buildDispatchWithGet(
        dispatch, '/api/roles',
        types.GET_ALL_ROLES,
        'roles'
      );
  };

/**
 * createRole - creates roles
 *
 * @param  {roleData} - data of role to be created
 * @return {Promise}       axios ajax call to backend
 */
export const createRole = roleData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/roles', roleData,
    types.CREATE_NEW_ROLE, 'createdRole');

/**
 * deleteRole - deletes roles
 *
 * @param  {integer} roleId - id of role to be deleted
 * @return {Promise}       axios ajax call to backend
 */
export const deleteRole = roleId =>
  dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatchAction(dispatch,
      {
        type: types.DELETE_ROLE,
        roleId
      }
    );
  });
