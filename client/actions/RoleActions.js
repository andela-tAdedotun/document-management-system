import axios from 'axios';

export const getRoles = () =>
  dispatch => axios.get('/api/roles').then((res) => {
    dispatch({
      type: 'GET_ALL_ROLES',
      roles: res.data
    });
  });

export const createRole = roleData =>
  dispatch => axios.post('/api/roles', roleData).then((res) => {
    dispatch({
      type: 'CREATE_NEW_ROLE',
      createdRole: res.data
    });
  });

export const deleteRole = roleId =>
  dispatch => axios.delete(`/api/roles/${roleId}`).then(() => {
    dispatch({
      type: 'DELETE_ROLE',
      roleId
    });
  });
