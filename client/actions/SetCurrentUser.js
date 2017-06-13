import types from './Types';

/**
 * setCurrentUser - puts details of current user in state
 *
 * @param  {object} user object representing user
 * @return {object}      pure object representing action
 */
function SetCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export default SetCurrentUser;
