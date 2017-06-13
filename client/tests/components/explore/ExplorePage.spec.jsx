import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ExplorePage } from '../../../components/explore/ExplorePage';

const setup = ({ roleId, pageCount }) => {
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

  return shallow(<ExplorePage {...props} />);
};

describe('The ExplorePage component', () => {
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

  it('shows four options for filter for super admin', () => {
    const wrapper = setup({ roleId: 1 });
    expect(wrapper.find('option').length).toBe(4);
    expect(wrapper.find('option').at(0).prop('value')).toBe('all');
    expect(wrapper.find('option').at(0).prop('children')).toBe('All');
    expect(wrapper.find('option').at(1).prop('value')).toBe('public');
    expect(wrapper.find('option').at(1).prop('children')).toBe('Public');
    expect(wrapper.find('option').at(2).prop('value')).toBe('role');
    expect(wrapper.find('option').at(2).prop('children')).toBe('Role');
    expect(wrapper.find('option').at(3).prop('value')).toBe('private');
    expect(wrapper.find('option').at(3).prop('children')).toBe('Private');
  });

  it('shows four options for filter for admin', () => {
    const wrapper = setup({ roleId: 2 });
    expect(wrapper.find('option').length).toBe(4);
    expect(wrapper.find('option').at(0).prop('value')).toBe('all');
    expect(wrapper.find('option').at(0).prop('children')).toBe('All');
    expect(wrapper.find('option').at(1).prop('value')).toBe('public');
    expect(wrapper.find('option').at(1).prop('children')).toBe('Public');
    expect(wrapper.find('option').at(2).prop('value')).toBe('role');
    expect(wrapper.find('option').at(2).prop('children')).toBe('Role');
    expect(wrapper.find('option').at(3).prop('value')).toBe('private');
    expect(wrapper.find('option').at(3).prop('children')).toBe('Private');
  });

  it('shows three options for filter for regular user', () => {
    const wrapper = setup({ roleId: 3 });
    expect(wrapper.find('option').length).toBe(3);
    expect(wrapper.find('option').at(0).prop('value')).toBe('all');
    expect(wrapper.find('option').at(0).prop('children')).toBe('All');
    expect(wrapper.find('option').at(1).prop('value')).toBe('public');
    expect(wrapper.find('option').at(1).prop('children')).toBe('Public');
    expect(wrapper.find('option').at(2).prop('value')).toBe('role');
    expect(wrapper.find('option').at(2).prop('children')).toBe('Role');
    expect(wrapper.find('option').at(3).prop('value')).toBe(undefined);
    expect(wrapper.find('option').at(3).prop('children')).toBe(undefined);
  });
});
