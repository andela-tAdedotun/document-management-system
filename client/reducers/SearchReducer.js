import types from '../actions/Types';

const initialState = {
  searchParams: {}
};

/**
 * anonymous function - reducer for user actions
 *
 * @param  {object} state - current state
 * @param  {object} action - action dispatched
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
