import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import SignupAction from '../../actions/SignupAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userDetails = {
  name: 'Taiwo',
  email: 'taiwo@ade.com',
  password: '123456',
};

describe('LoginAction', () => {
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

  const successResponse = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkI' +
    'joxLCJpYXQiOjE0OTUyODg5MTJ9.Q_mWF8lslh3zns_IBK4Cqt9k9pkPQareS6FoYCbD0H0',
    user: userDetails
  };

  const failureResponse = {
    message: 'Invalid signup parameters.'
  };

  after(() => {
    nock.cleanAll();
  });

  it('should dispatch SET_CURRENT_USER on successful signup', () => {
    nock('http://localhost:80')
      .post('/api/users', userDetails)
      .reply(201, successResponse);

    const expectedAction = [
      {
        type: 'SET_CURRENT_USER',
        user: { id: 1, roleId: 1, iat: 1495288912 }
      }
    ];

    const store = mockStore({});
    store.dispatch(SignupAction(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should dispatch SIGNUP_FAILURE if signup fails', () => {
    nock('http://localhost:80')
      .post('/api/users', userDetails)
      .reply(400, failureResponse);

    const expectedAction = [
      {
        type: 'SIGNUP_FAILURE',
        message: 'Invalid signup parameters.'
      }
    ];

    const store = mockStore({});
    store.dispatch(SignupAction(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
