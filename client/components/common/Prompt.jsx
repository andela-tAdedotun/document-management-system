import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';

/**
 * Prompt - returns modal for yes or no prompts
 *
 * @param  {object} trigger - element to use as trigger for modal
 * @param  {function} onClickFunction - onClick event handler
 * @param  {string} headerMessage - message to be displayed in prompt(optional)
 * @return {void}
 */
const Prompt = ({ trigger, onClickFunction, headerMessage, buttonClass }) =>
  (
    <Modal
      className="prompt"
      actions={[
        <Button waves="light" modal="close" className="no-delete" flat>
          NO
        </Button>,
        <Button
          onClick={onClickFunction} waves="light" modal="close" flat
          className={`red white-text ${buttonClass}`}
        >
        YES
        </Button>
      ]}
      header={headerMessage}
      trigger={
        trigger
      }
    />
  );

Prompt.propTypes = {
  trigger: PropTypes.object.isRequired,
  onClickFunction: PropTypes.func.isRequired,
  headerMessage: PropTypes.string,
  buttonClass: PropTypes.string
};

Prompt.defaultProps = {
  headerMessage: 'Are you sure?',
  buttonClass: 'yes-delete'
};

export default Prompt;
