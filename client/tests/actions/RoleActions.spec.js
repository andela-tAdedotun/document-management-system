import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import nock from 'nock';
import { createRole, deleteRole, getRoles }
  from '../../actions/RoleActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
dotenv.config();
const url = process.env.TEST_URL;

describe('RoleActions', () => {
  describe('getRoles', () => {
    const allRoles = [
      {
        userRole: 'Super Admin',
        id: 1
      },
      {
        userRole: 'Admin',
        id: 2
      },
    ];

    it('should dispatch GET_ALL_ROLES and IS_SEARCH', () => {
      nock(url)
        .get('/api/roles')
        .reply(200, allRoles);

      const expectedAction = [
        {
          type: 'IS_SEARCH',
          searchPayload: { isSearch: false, searchQuery: '' }
        },
        { type: 'GET_ALL_ROLES', roles: allRoles }
      ];

      const store = mockStore({});
      store.dispatch(getRoles()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('createRole', () => {
    const createdRole =
      {
        userRole: 'Content Creator',
        id: 1
      };

    it('should dispatch CREATE_NEW_ROLE when new role is created', () => {
      nock(url)
        .post('/api/roles', createdRole)
        .reply(200, createdRole);

      const expectedAction = [
        { type: 'CREATE_NEW_ROLE', createdRole }
      ];

      const store = mockStore({});
      store.dispatch(createRole(createdRole)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('deleteRole', () => {
    const response = {
      message: 'Role successfully deleted.'
    };
    it('should dispatch DELETE_ROLE when role is deleted', () => {
      nock(url)
        .delete('/api/roles/4')
        .reply(200, response);

      const expectedAction = [
        { type: 'DELETE_ROLE', roleId: 4 }
      ];

      const store = mockStore({});
      store.dispatch(deleteRole(4)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
