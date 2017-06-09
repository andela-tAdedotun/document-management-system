import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../../../components/signup/SignupPage';

const setup = () => {
  const props = {
    signup: () => {},
    currentState: {}
  };

  return shallow(<SignupPage {...props} />);
};

describe('The SignupPage component', () => {
  it('renders the SignupForm component', () => {
    const wrapper = setup();
    expect(wrapper.find('SignupForm').length).toBe(1);
  });
});
