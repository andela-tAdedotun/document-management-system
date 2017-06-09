import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../../components/signup/SignupForm';

/**
 * setup - description
 *
 * @return {type}  description
 */
function setup() {
  const props = {
    authorization: {},
    userSignup: () => {}
  };

  return shallow(<SignupForm {...props} />);
}

describe('The SignupForm component', () => {
  let wrapper;
  before(() => {
    wrapper = setup();
  });

  it('should display a form for signup', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should have a button labeled Signup that submits form', () => {
    const submitButton = wrapper.find('button');
    expect(submitButton.length).toBe(1);
    expect(submitButton.prop('children')).toBe('Signup');
    expect(submitButton.prop('type')).toBe('submit');
    submitButton.simulate('click');
  });

  it('should have an email form field', () => {
    expect(wrapper.find('input[type="email"]').length).toBe(1);
  });

  it('should have a field for username', () => {
    expect(wrapper.find('input[name="name"]').length).toBe(1);
  });

  it('should have two password fields', () => {
    expect(wrapper.find('input[type="password"]').length).toBe(2);
    expect(wrapper.find('input[type="password"]').at(0).prop('name'))
      .toBe('password');
    expect(wrapper.find('input[type="password"]').at(1).prop('name'))
      .toBe('confirmPassword');
  });
});
