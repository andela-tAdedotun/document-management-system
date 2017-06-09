import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../../components/App';
import Footer from '../../../components/common/Footer';

const setup = () => {
  const props = {
    logout: () => {},
    location: {},
  };

  return shallow(<App {...props} />);
};

describe('The App component', () => {
  it('renders the Footer component', () => {
    const wrapper = setup();
    expect(wrapper.contains(<Footer />)).toBe(true);
  });
});
