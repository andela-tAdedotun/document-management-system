import types from '../actions/types';

const initialState = {
  searchParams: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.IS_SEARCH: {
      return Object.assign({}, state, { searchParams: action.searchPayload });
    }

    default: return state;
  }
};
