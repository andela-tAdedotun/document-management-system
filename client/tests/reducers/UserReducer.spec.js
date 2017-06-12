import expect from 'expect';
import types from '../../actions/Types';
import userReducer from '../../reducers/UserReducer';

describe('UserReducer', () => {
  const usersInDatabase = {
    paginationInfo: {
      page_count: 1,
      page: 1,
      page_size: 1,
      total_count: 2
    },
    users: [
      {
        id: 1,
        name: 'Taiwo Adedotun',
        email: 'taiwo.adedotun@andela.com',
        privacy: 'public',
        createdAt: '2017-05-20T14:01:51.891Z',
        updatedAt: '2017-06-03T11:48:54.226Z',
        roleId: 1
      },
      {
        id: 2,
        name: 'Kehinde Adedotun',
        email: 'kehinde.adedotun@andela.com',
        privacy: 'public',
        createdAt: '2017-05-20T14:01:51.891Z',
        updatedAt: '2017-06-03T11:48:54.226Z',
        roleId: 2
      },
    ]
  };

  it('should put all users in the store if handled GET_ALL_USERS', () => {
    const state = {};
    const expectedState = {
      usersInDatabase
    };

    const action = {
      type: types.GET_ALL_USERS,
      allUsers: usersInDatabase
    };

    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('replaces edited user if new details if handled ADMIN_UPDATE_USER', () => {
    const state = {
      usersInDatabase
    };

    const updatedUser = {
      id: 1,
      name: 'Taiwo Adedotun A.',
      email: 'taiwo.adedotun@andela.com',
      privacy: 'public',
      createdAt: '2017-05-20T14:01:51.891Z',
      updatedAt: '2017-06-03T11:48:54.226Z',
      roleId: 1
    };

    const expectedState = {
      usersInDatabase: {
        paginationInfo: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        users: [
          {
            id: 1,
            name: 'Taiwo Adedotun A.',
            email: 'taiwo.adedotun@andela.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:01:51.891Z',
            updatedAt: '2017-06-03T11:48:54.226Z',
            roleId: 1
          },
          {
            id: 2,
            name: 'Kehinde Adedotun',
            email: 'kehinde.adedotun@andela.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:01:51.891Z',
            updatedAt: '2017-06-03T11:48:54.226Z',
            roleId: 2
          },
        ]
      }
    };

    const action = {
      type: types.ADMIN_UPDATE_USER,
      updatedUser,
      userId: 1
    };

    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('removes one user from state if handled DELETE_USER', () => {
    const state = {
      usersInDatabase
    };

    const expectedState = {
      usersInDatabase: {
        paginationInfo: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        users: [
          {
            id: 2,
            name: 'Kehinde Adedotun',
            email: 'kehinde.adedotun@andela.com',
            privacy: 'public',
            createdAt: '2017-05-20T14:01:51.891Z',
            updatedAt: '2017-06-03T11:48:54.226Z',
            roleId: 2
          },
        ]
      }
    };

    const action = {
      type: types.DELETE_USER,
      userId: 1
    };

    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('should add one user to state if handled CREATE_NEW_USER', () => {
    const state = {
      usersInDatabase
    };
    const createdUser = {
      id: 1,
      name: 'Taiwo Adedotun',
      email: 'taiwo.adedotun@andela.com',
      privacy: 'public',
      createdAt: '2017-05-20T14:01:51.891Z',
      updatedAt: '2017-06-03T11:48:54.226Z',
      roleId: 1
    };
    const expectedState = {
      usersInDatabase
    };
    const action = {
      type: types.CREATE_NEW_USER,
      createdUser
    };
    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });
});
