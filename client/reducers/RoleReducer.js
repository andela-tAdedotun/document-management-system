import types from '../actions/Types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_ROLES: {
      return Object.assign({}, state, { allRoles: action.roles });
    }

    case types.CREATE_NEW_ROLE: {
      return Object.assign({}, state, {
        allRoles: [...state.allRoles, action.createdRole]
      });
    }

    case types.DELETE_ROLE: {
      return Object.assign({}, state, {
        allRoles: [...state.allRoles.filter(role =>
          role.id !== action.roleId
        )]
      });
    }

    default: return state;
  }
};