import findIndex from 'lodash/findIndex';
import types from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_ALL_USERS: {
      return action.allUsers;
    }

    case types.ADMIN_UPDATE_USER: {
      const index =
        findIndex(state.users, { id: action.userId });
      const stateCopy = Object.assign({}, state);
      stateCopy.users[index] = action.updatedUser;
      return stateCopy;
    }

    case types.DELETE_USER: {
      const index =
        findIndex(state.users, { id: action.userId });
      const stateCopy = Object.assign({}, state);
      stateCopy.users.splice(index, 1);
      return stateCopy;
    }

    case types.CREATE_NEW_USER: {
      const stateCopy = Object.assign({}, state);
      stateCopy.users.push(action.createdUser);
      return stateCopy;
    }

    default: return state;
  }
};
