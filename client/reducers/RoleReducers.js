import findIndex from 'lodash/findIndex';
import types from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_ALL_ROLES: {
      return [
        ...state,
        {
          allRoles: action.roles
        }
      ];
    }

    case types.CREATE_NEW_ROLE: {
      const stateCopy = [...state];
      stateCopy[0].allRoles.push(action.createdRole);
      return stateCopy;
    }

    case types.DELETE_ROLE: {
      const index =
        findIndex(state[0].allRoles, { id: action.roleId });
      const stateCopy = [...state];
      stateCopy[0].allRoles.splice(index, 1);
      return stateCopy;
    }

    default: return state;
  }
};
