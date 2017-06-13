import types from '../actions/Types';

const initialState = {
  searchParams: {}
};

/**
 * anonymous function - reducer for search actions
 *
 * @param  {object} state - current state
 * @return {object} - new state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.IS_SEARCH: {
      return Object.assign({}, state, { searchParams: action.searchPayload });
    }

    default: return state;
  }
};
