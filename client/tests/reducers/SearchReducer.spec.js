import expect from 'expect';
import types from '../../actions/Types';
import searchReducer from '../../reducers/SearchReducer';

describe('SearchReducer', () => {
  it('should put search parameters in state if handeld IS_SEARCH', () => {
    const state = {};

    const expectedState = {
      searchParams: {
        isSearch: true,
        searchQuery: 'taiwo'
      }
    };

    const action = {
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: true,
        searchQuery: 'taiwo'
      }
    };

    const newState = searchReducer(state, action);
    expect(newState).toEqual(expectedState);
  });
});
