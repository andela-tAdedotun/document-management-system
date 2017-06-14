import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserDocuments } from '../../../components/home/UserDocuments';

const setup = ({ pageCount }) => {
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
          paginationInfo: {
            pageCount
          }
        }
      },
      searchParams: {
        searchParams: {}
      },
      allDocuments: {
        documents: {
          documents: {},
          paginationInfo: {
            pageCount
          }
        }
      }
    },
    displayDocuments: () => {},
    documentDelete: () => {},
    documentEdit: () => {},
    displaySearchResults: () => {}
  };

  return shallow(<UserDocuments {...props} />);
};

describe('The UserDocuments component', () => {
  it('should display pagination component if pageCount is one or above', () => {
    const wrapper = setup({ pageCount: 1 });
    expect(wrapper.find('Pagination').length).toEqual(1);
  });

  it('should not display pagination component if pageCount is less than one',
  () => {
    const wrapper = setup({ pageCount: 0 });
    expect(wrapper.find('Pagination').length).toEqual(0);
  });

  it('renders an input element in Row for document access', () => {
    const wrapper = setup({});
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Row').length).toBe(1);
  });

  it('shows four options for filter for user', () => {
    const wrapper = setup({});
    expect(wrapper.find('option').length).toBe(4);
    expect(wrapper.find('option').at(0).prop('value')).toBe('all');
    expect(wrapper.find('option').at(0).prop('children')).toBe('All');
    expect(wrapper.find('option').at(1).prop('value')).toBe('public');
    expect(wrapper.find('option').at(1).prop('children')).toBe('Public');
    expect(wrapper.find('option').at(2).prop('value')).toBe('private');
    expect(wrapper.find('option').at(2).prop('children')).toBe('Private');
    expect(wrapper.find('option').at(3).prop('value')).toBe('role');
    expect(wrapper.find('option').at(3).prop('children')).toBe('Role');
  });
});
