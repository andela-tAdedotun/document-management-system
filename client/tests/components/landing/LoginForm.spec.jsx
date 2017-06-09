import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../components/landing/LoginForm';

/**
 * setup - description
 *
 * @return {type}  description
 */
function setup() {
  const props = {
    authorization: {},
    userLogin: () => {}
  };

  return shallow(<LoginForm {...props} />);
}

describe('The LoginForm component', () => {
  let wrapper;
  before(() => {
    wrapper = setup();
  });

  it('should display a form for login', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should have a button labeled Enter that submits form', () => {
    const enterButton = wrapper.find('button');
    expect(enterButton.length).toBe(1);
    expect(enterButton.prop('children')).toBe('Enter');
    expect(enterButton.prop('type')).toBe('submit');
  });

  it('should have an email form field', () => {
    expect(wrapper.find('input[type="email"]').length).toBe(1);
  });

  it('should have a password field', () => {
    expect(wrapper.find('input[type="password"]').length).toBe(1);
  });
});
