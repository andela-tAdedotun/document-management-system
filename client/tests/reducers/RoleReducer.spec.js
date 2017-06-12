import expect from 'expect';
import types from '../../actions/Types';
import roleReducer from '../../reducers/RoleReducer';

describe('RoleReducer', () => {
  const allRoles = [
    {
      id: 1,
      userRole: 'Super Admin',
      createdAt: '2017-05-20T14:00:23.296Z',
      updatedAt: '2017-05-20T14:00:23.296Z'
    },
    {
      id: 2,
      userRole: 'Admin',
      createdAt: '2017-05-20T14:00:23.296Z',
      updatedAt: '2017-05-20T14:00:23.296Z'
    },
    {
      id: 3,
      userRole: 'Regular',
      createdAt: '2017-05-20T14:00:23.296Z',
      updatedAt: '2017-05-20T14:00:23.296Z'
    }
  ];

  it('should put all roles in state if handled GET_ALL_ROLES', () => {
    const state = {};
    const expectedState = {
      allRoles
    };

    const action = {
      type: types.GET_ALL_ROLES,
      roles: allRoles
    };

    const newState = roleReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('should add one role to state if handled CREATE_NEW_ROLE', () => {
    const state = {
      allRoles
    };

    const createdRole = {
      id: 4,
      userRole: 'Content Creator',
      createdAt: '2017-05-20T14:00:23.296Z',
      updatedAt: '2017-05-20T14:00:23.296Z'
    };

    const expectedState = {
      allRoles: [...allRoles, createdRole]
    };

    const action = {
      type: types.CREATE_NEW_ROLE,
      createdRole
    };

    const newState = roleReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('should remove one role from state if handled DELETE_ROLE', () => {
    const state = {
      allRoles
    };

    const expectedState = {
      allRoles: [
        {
          id: 1,
          userRole: 'Super Admin',
          createdAt: '2017-05-20T14:00:23.296Z',
          updatedAt: '2017-05-20T14:00:23.296Z'
        },
        {
          id: 2,
          userRole: 'Admin',
          createdAt: '2017-05-20T14:00:23.296Z',
          updatedAt: '2017-05-20T14:00:23.296Z'
        }
      ]
    };

    const action = {
      type: types.DELETE_ROLE,
      roleId: 3
    };

    const newState = roleReducer(state, action);
    expect(newState).toEqual(expectedState);
  });
});
