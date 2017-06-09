import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../../components/dashboard/DashboardPage';

const setup = () => {
  const props = {
    currentState: {
      authorization: {
        user: {}
      },
      roles: {
        allRoles: []
      },
      usersInDatabase: {
        usersInDatabase: {
          users: [],
          paginationInfo: {}
        }
      }
    },
    getUsers: () => {},
    userUpdate: () => {},
    createUser: () => {},
    getRoles: () => {},
    createRole: () => {}
  };

  return shallow(<DashboardPage {...props} />);
};

describe('The DashboardPage component', () => {
  it('should render PersonalProfile component', () => {
    const wrapper = setup();
    expect(wrapper.find('PersonalProfile').length).toBe(1);
  });

  it('should render have two forms for creating users and roles', () => {
    const wrapper = setup();
    const forms = wrapper.find('form');
    expect(forms.length).toBe(2);
    expect(forms.at(0).prop('onSubmit')).toBeA('function');
    expect(forms.at(1).prop('onSubmit')).toBeA('function');
    expect(forms.at(0).prop('onSubmit').name).toBe('bound createUser');
    expect(forms.at(1).prop('onSubmit').name).toBe('bound createRole');
  });

  it('should have two submit buttons for the two forms', () => {
    const wrapper = setup();
    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(2);
  });
});
