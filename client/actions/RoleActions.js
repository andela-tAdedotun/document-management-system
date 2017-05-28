import axios from 'axios';
import types from './types';

export const getRoles = () =>
  dispatch => axios.get('/api/roles').then((res) => {
    dispatch({
      type: types.GET_ALL_ROLES,
      roles: res.data
    });
  });

export const createRole = roleData =>
  dispatch => axios.post('/api/roles', roleData).then((res) => {
    dispatch({
      type: types.CREATE_NEW_ROLE,
      createdRole: res.data
    });
  });

export const deleteRole = roleId =>
  dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatch({
      type: types.DELETE_ROLE,
      roleId
    });
  });
