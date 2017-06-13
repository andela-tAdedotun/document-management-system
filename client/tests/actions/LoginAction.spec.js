import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import LoginAction from '../../actions/LoginAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  email: 'taiwo.adedotun@andela.com',
  password: '123456'
};

describe('LoginAction', () => {
  before(() => {
    /**
     * mockStorage - mocks localStorage to avoid error from mocha
     *
     * @return {object}  representing some methods of localStorage
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

  const successResponse = {
    message: 'Ok.',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkI' +
    'joxLCJpYXQiOjE0OTUyODg5MTJ9.Q_mWF8lslh3zns_IBK4Cqt9k9pkPQareS6FoYCbD0H0'
  };

  const failureResponse = {
    message: 'Incorrect password or email. Try again.',
  };

  after(() => {
    nock.cleanAll();
  });

  it('should dispatch SET_CURRENT_USER on successful login', () => {
    nock('http://localhost:80/')
      .post('/api/users/login', userData)
      .reply(200, successResponse);

    const expectedAction = [
      {
        type: 'SET_CURRENT_USER',
        user: { id: 1, roleId: 1, iat: 1495288912 }
      }
    ];

    const store = mockStore({
      userData: {}
    });

    store.dispatch(LoginAction(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('should dispatch LOGIN_FAILURE if login is not successful', () => {
    nock('http://localhost:80/')
      .post('/api/users/login', userData)
      .reply(401, failureResponse);

    const expectedAction = [
      {
        type: 'LOGIN_FAILURE',
        message: 'Incorrect password or email. Try again.'
      }
    ];

    const store = mockStore({
      userData: {}
    });

    store.dispatch(LoginAction(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
