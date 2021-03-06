import React from 'react';
import { Row, Input } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 * AccessSelect - component for selecting document access
 *
 * @param  {function} handleChange - function for onChange event
 * @return {Promise}       axios ajax call to backend
 * @return {object}       markup
 */
const AccessSelect = ({ handleChange }) =>
  (
    <Row>
      <Input
        s={12}
        type="select"
        name="access"
        label="Who Can Access"
        onChange={handleChange}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="role">Role</option>
      </Input>
    </Row>
  );

AccessSelect.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default AccessSelect;
