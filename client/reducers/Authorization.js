import types from '../actions/Types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

/**
 * anonymous function - reducer for authorization actions
 *
 * @param  {object} state - current state
 * @return {object} - new state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      return {
        isAuthenticated:
            action.user ? Object.keys(action.user).length > 0 : false,
        user: action.user
      };
    }

    case types.LOGIN_FAILURE: {
      return Object.assign({}, state, { loginError: action.message });
    }

    case types.SIGNUP_FAILURE: {
      return Object.assign({}, state, { signUpError: action.message });
    }
    default: return state;
  }
};
