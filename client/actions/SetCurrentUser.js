import types from './Types';

/**
 * setCurrentUser - puts details of current user in state
 *
 * @param  {type} user object representing user
 * @return {type}      pure object
 */
function SetCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

export default SetCurrentUser;
