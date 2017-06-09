import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DisplayDocuments from '../../../components/explore/DisplayDocuments';

const setup = (isProtected) => {
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
    document: {
      title: '',
      content: '',
      isProtected,
      User: {}
    },
    editDocument: () => {},
    deleteDocument: () => {},
  };

  return shallow(<DisplayDocuments {...props} />);
};

describe('The DisplayUserDocuments component', () => {
  it('should display the locked icon if document is protected', () => {
    const wrapper = setup(true);
    expect(wrapper.find('#locked').length).toEqual(1);
  });

  it('should not display the locked icon if document is not protected', () => {
    const wrapper = setup(false);
    expect(wrapper.find('#locked').length).toEqual(0);
  });

  it('should have cards that display documents', () => {
    const wrapper = setup();
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('should render the Prompt component for deleting document', () => {
    const wrapper = setup();
    expect(wrapper.find('Prompt').length).toEqual(1);
  });
});
