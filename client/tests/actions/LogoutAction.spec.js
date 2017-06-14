import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import nock from 'nock';
import LogoutAction from '../../actions/LogoutAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

dotenv.config();
const url = process.env.TEST_URL;

describe('LogoutAction', () => {
  before(() => {
    /**
     * mockStorage - description
     *
     * @return {type}  description
     */
    function mockStorage() {
      const storage = {};
      return {
        setItem: (key, value) => {
          storage[key] = value || '';
        },
        getItem: key =>
          storage[key],
        removeItem: (key) => {
          delete storage[key];
        },
        get length() {
          return Object.keys(storage).length;
        },
        key: (i) => {
          const keys = Object.keys(storage);
          return keys[i] || null;
        }
      };
    }

    global.localStorage = mockStorage();
  });

  after(() => {
    nock.cleanAll();
  });

  it('should dispatch USER_LOGOUT on successful login', () => {
    nock(url)
      .post('/api/users/logout')
      .reply(200, {
        redirectTo: '/'
      });

    const expectedAction = [
      {
        type: 'USER_LOGOUT',
      }
    ];

    const store = mockStore({});

    store.dispatch(LogoutAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
