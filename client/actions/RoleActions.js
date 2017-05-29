import axios from 'axios';
import types from './types';
import { dispatchAction, buildDispatchWithPost, buildDispatchWithGet }
  from '../utilities/dispatchHelper';

export const getRoles = () =>
  dispatch =>
    buildDispatchWithGet(
        dispatch, '/api/roles/',
        types.GET_ALL_ROLES,
        'roles'
      );

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
