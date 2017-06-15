import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import nock from 'nock';
import { getUsers, createUser, deleteUser, updateUser }
  from '../../actions/UserActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
dotenv.config();
const url = process.env.TEST_URL;

const userDetails = {
  id: 10,
  name: 'Taiwo',
  email: 'taiwo@ade.com',
  password: '123456',
  roleId: 3
};

describe('UserActions', () => {
  describe('updateUser', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch ADMIN_UPDATE_USER if an admin updates user', () => {
      const response = {
        id: 10,
        name: 'Kehinde',
        email: 'taiwo@ade.com',
        roleId: 3
      };

      const update = {
        name: 'Kehinde'
      };

      nock(url)
        .put('/api/users/10', update)
        .reply(200, response);

      const expectedAction = [
        {
          type: 'ADMIN_UPDATE_USER',
          updatedUser: response,
          userId: 10
        }
      ];

      const store = mockStore({});
      store.dispatch(updateUser(userDetails, update, true)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('getUsers', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch GET_ALL_USERS', () => {
      const response = {
        paginationInfo: {},
        users: [
          {
            name: 'Taiwo Adedotun',
            email: 'taiwo.adedotun@andela.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:01:51.891Z',
            updatedAt: '2017-06-03T11:48:54.226Z',
            roleId: 1
          },

          {
            id: 2,
            name: 'Kehinde',
            email: 'kehinde@xyz.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:03:04.604Z',
            updatedAt: '2017-05-29T23:02:35.447Z',
            roleId: 2
          }
        ]
      };

      nock(url)
        .get('/api/users/?offset=undefined&limit=undefined')
        .reply(200, response);

      const expectedAction = [{
        type: 'GET_ALL_USERS',
        allUsers: response
      }];

      const store = mockStore({});
      store.dispatch(getUsers()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('deleteDocument', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch DELETE_USER if user is deleted', () => {
      nock(url)
        .delete('/api/users/10')
        .reply(200, {
          message: 'User successfuly deleted.'
        });

      const expectedAction = [{
        type: 'DELETE_USER',
        userId: 10
      }];

      const store = mockStore({});

      store.dispatch(deleteUser(10)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('createUser', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch CREATE_NEW_USER if new user is created', () => {
      nock(url)
        .post('/api/users/create', userDetails)
        .reply(201, {
          token: 'q29uoijkwe192ijojklwe192iohwejmnsd',
          user: userDetails
        });

      const expectedAction = [{
        type: 'CREATE_NEW_USER',
        createdUser: userDetails
      }];

      const store = mockStore({});

      store.dispatch(createUser(userDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should dispatch CREATE_NEW_USER if new user is created', () => {
      nock(url)
        .post('/api/users/create', userDetails)
        .reply(201, {
          token: 'q29uoijkwe192ijojklwe192iohwejmnsd',
          user: userDetails
        });

      const expectedAction = [{
        type: 'CREATE_NEW_USER',
        createdUser: userDetails
      }];

      const store = mockStore({});

      store.dispatch(createUser(userDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
