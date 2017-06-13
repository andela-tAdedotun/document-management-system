import React from 'react';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 * ProtectedSelect - component for selecting document protection
 *
 * @param  {function} handleChange - function for onChange event
 * @return {object}       markup
 */
const ProtectedSelect = ({ handleChange }) =>
  (
    <Row>
      <Input
        s={12}
        type="select"
        name="isProtected"
        label="Protected (cannot be deleted)"
        onChange={handleChange}
      >
        <option value="false">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Input>
    </Row>
  );

ProtectedSelect.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default ProtectedSelect;
