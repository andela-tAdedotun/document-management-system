import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from '../../../components/landing/LandingPage';

const setup = () => {
  const props = {
    login: () => {},
    currentState: {}
  };

  return shallow(<LandingPage {...props} />);
};

describe('The LandingPage component', () => {
  it('renders the LoginForm component', () => {
    const wrapper = setup();
    expect(wrapper.find('LoginForm').length).toBe(1);
  });
});
