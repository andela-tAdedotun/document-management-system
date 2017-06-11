import axios from 'axios';
import types from './Types';
import { dispatchAction, buildDispatchWithPost, buildDispatchWithGet }
  from '../utilities/DispatchHelper';

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

export const createRole = roleData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/roles', roleData,
    types.CREATE_NEW_ROLE, 'createdRole');

export const deleteRole = roleId =>
  dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatchAction(dispatch,
      {
        type: types.DELETE_ROLE,
        roleId
      }
    );
  });
