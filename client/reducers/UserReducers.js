import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'GET_ALL_USERS': {
      return action.allUsers;
    }

    case 'ADMIN_UPDATE_USER': {
      const index =
        findIndex(state[0].allUsers.users, { id: action.userId });
      const stateCopy = [...state];
      stateCopy[0].allUsers.users[index] = action.updatedUser;
      return stateCopy;
    }

    case 'DELETE_USER': {
      const index =
        findIndex(state[0].allUsers.users, { id: action.userId });
      const stateCopy = [...state];
      stateCopy[0].allUsers.users.splice(index, 1);
      return stateCopy;
    }

    case 'CREATE_NEW_USER': {
      const stateCopy = [...state];
      stateCopy[0].allUsers.users.push(action.createdUser);
      return stateCopy;
    }

    default: return state;
  }
};
