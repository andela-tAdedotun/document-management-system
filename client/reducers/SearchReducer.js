import types from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.IS_SEARCH: {
      return action.searchPayload;
    }

    default: return state;
  }
};
