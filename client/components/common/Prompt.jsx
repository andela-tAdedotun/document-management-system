import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';

const Prompt = ({ trigger, onClickFunction }) =>
  (
    <Modal
      actions={[
        <Button waves="light" modal="close" flat>
          NO
        </Button>,
        <Button
          onClick={onClickFunction} waves="light" modal="close" flat
          className="red white-text"
        >
        YES
        </Button>
      ]}
      header="Are you sure?"
      trigger={
        trigger
      }
    />
  );

Prompt.propTypes = {
  trigger: PropTypes.object.isRequired,
  onClickFunction: PropTypes.func.isRequired
};

export default Prompt;
