import React from 'react';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';

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
