import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';

const Prompt = ({ trigger, onClickFunction, headerMessage }) =>
  (
    <Modal
      actions={[
        <Button waves="light" modal="close" className="no-delete" flat>
          NO
        </Button>,
        <Button
          onClick={onClickFunction} waves="light" modal="close" flat
          className="red white-text yes-delete"
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
  headerMessage: PropTypes.string
};

Prompt.defaultProps = {
  headerMessage: 'Are you sure?'
};

export default Prompt;
