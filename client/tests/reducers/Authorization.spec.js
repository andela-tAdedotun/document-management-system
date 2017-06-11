import expect from 'expect';
import types from '../../actions/Types';
import authorization from '../../reducers/Authorization';

describe('Authorization', () => {
  const state = {
    isAuthenticated: false,
    user: {}
  };
  it('puts current user details in state if handled SET_CURRENT_USER', () => {
    const user = {
      id: 1,
      roleId: 1
    };
    const expectedState = {
      isAuthenticated: true,
      user
    };

    const action = {
      type: types.SET_CURRENT_USER,
      user
    };

    const newState = authorization(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('adds loginError to state if handled LOGIN_FAILURE', () => {
    const expectedState = {
      isAuthenticated: false,
      user: {},
      loginError: 'Login failed'
    };

    const action = {
      type: types.LOGIN_FAILURE,
      message: 'Login failed'
    };

    const newState = authorization(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('adds signUpError to state if handled SIGNUP_FAILURE', () => {
    const expectedState = {
      isAuthenticated: false,
      user: {},
      signUpError: 'Signup failed'
    };

    const action = {
      type: types.SIGNUP_FAILURE,
      message: 'Signup failed'
    };

    const newState = authorization(state, action);
    expect(newState).toEqual(expectedState);
  });
});
