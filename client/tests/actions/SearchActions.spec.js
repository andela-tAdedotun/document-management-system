import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import searchAction
  from '../../actions/SearchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SearchAction', () => {
  after(() => {
    nock.cleanAll();
  });

  const expectedAction = [{
    type: 'IS_SEARCH',
    searchPayload: { isSearch: true, searchQuery: '' }
  }];

  it('should dispatch IS_SEARCH whenever called', () => {
    const store = mockStore({});
    store.dispatch(searchAction({ searchQuery: '', location: '' }));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
