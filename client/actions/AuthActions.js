import types from './types';

/**
 * setCurrentUser - puts details of current user in state
 *
 * @param  {type} user object representing user
 * @return {type}      pure object
 */
function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export default setCurrentUser;
