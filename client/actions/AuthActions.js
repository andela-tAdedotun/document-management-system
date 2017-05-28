import types from './types';

const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
};

export default setCurrentUser;
