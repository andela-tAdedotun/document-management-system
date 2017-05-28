import types from './types';

/**
 * setCurrentUser - description
 *
 * @param  {type} user description
 * @return {type}      description
 */
function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export default setCurrentUser;
