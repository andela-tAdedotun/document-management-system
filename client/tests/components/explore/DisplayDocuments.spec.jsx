import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DisplayDocuments from '../../../components/explore/DisplayDocuments';

const setup = (roleId) => {
  const props = {
    currentState: {
      authorization: {
        user: {
          roleId
        }
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
    document: {
      title: '',
      content: '',
      User: {}
    },
    editDocument: () => {},
    deleteDocument: () => {},
  };

  return shallow(<DisplayDocuments {...props} />);
};

describe('The DisplayDocuments coomponent', () => {
  it('should have cards that display documents', () => {
    const wrapper = setup();
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('should not show delete button for regular user', () => {
    const wrapper = setup(3);
    expect(wrapper.find('Prompt').length).toEqual(0);
  });

  it('should not show edit button for regular user', () => {
    const wrapper = setup(3);
    expect(wrapper.find('form').length).toEqual(0);
  });

  it('should show delete button for super admin', () => {
    const wrapper = setup(1);
    expect(wrapper.find('Prompt').length).toEqual(1);
  });

  it('should show edit button for super admin', () => {
    const wrapper = setup(1);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should show delete button for admin', () => {
    const wrapper = setup(2);
    expect(wrapper.find('Prompt').length).toEqual(1);
  });

  it('should show edit button for admin', () => {
    const wrapper = setup(2);
    expect(wrapper.find('form').length).toEqual(1);
  });
});
