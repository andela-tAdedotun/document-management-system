import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AccessSelect from '../../../components/common/ProtectedSelect';


/**
 * setup - description
 *
 * @return {type}  description
 */
function setup() {
  const props = {
    handleChange: () => {},
  };

  return shallow(<AccessSelect {...props} />);
}

describe('The ProtectedSelect component', () => {
  let wrapper;
  before(() => {
    wrapper = setup();
  });

  it('renders an input element in Row for document access', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Row').length).toBe(1);
  });

  it('should display three options for document access', () => {
    expect(wrapper.find('option').length).toBe(3);
  });

  it('should have Choose, Yes and No as options', () => {
    expect(wrapper.find('option').at(0).prop('value')).toBe('false');
    expect(wrapper.find('option').at(0).prop('children')).toBe('Choose');
    expect(wrapper.find('option').at(1).prop('value')).toBe('true');
    expect(wrapper.find('option').at(1).prop('children')).toBe('Yes');
    expect(wrapper.find('option').at(2).prop('value')).toBe('false');
    expect(wrapper.find('option').at(2).prop('children')).toBe('No');
  });
});
