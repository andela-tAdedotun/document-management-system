import types from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      return {
        isAuthenticated:
            action.user ? Object.keys(action.user).length > 0 : false,
        user: action.user
      };
    }
    default: return state;
  }
};
