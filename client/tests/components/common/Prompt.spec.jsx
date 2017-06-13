import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-materialize';
import Prompt from '../../../components/common/Prompt';


/**
 * setup - description
 *
 * @param  {type} trigger         description
 * @param  {type} onClickFunction description
 * @param  {type} headerMessage   description
 * @return {type}                 description
 */
const setup = ({ trigger, onClickFunction, headerMessage }) => {
  const props = {
    trigger,
    onClickFunction,
    headerMessage,
    handleChange: () => {},
  };

  return shallow(<Prompt {...props} />);
};

describe('The Prompt component', () => {
  let wrapper = setup({ trigger: <Button> Trigger </Button> });
  it('has a modal for prompting', () => {
    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('should have two buttons for a yes or no choice', () => {
    const modalActions = wrapper.find('Modal').prop('actions');
    expect((modalActions).length).toBe(2);
    expect(modalActions[0].props.children).toBe('NO');
    expect(modalActions[1].props.children).toBe('YES');
  });
  it('has a default header message when none is provided', () => {
    expect(wrapper.find('Modal').prop('header')).toBe('Are you sure?');
  });

  it('changes header message based on what is provided', () => {
    wrapper = setup({ headerMessage: 'Do you want to continue?' });
    expect(wrapper.find('Modal').prop('header'))
      .toBe('Do you want to continue?');
  });

  it('uses provided trigger argument as trigger for modal', () => {
    wrapper = setup({ trigger: <button> Trigger </button> });
    expect(wrapper.find('Modal').prop('trigger').type).toBe('button');
    wrapper = setup({ trigger: <a> Trigger </a> });
    expect(wrapper.find('Modal').prop('trigger').type).toBe('a');
  });
});
