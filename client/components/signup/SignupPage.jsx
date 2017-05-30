import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import userSignup from '../../actions/SignupActions';

const SignupPage = ({ signup }) =>
  (
    <div className="container">
      <SignupForm userSignup={signup} />
    </div>
  );


SignupPage.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup: userSignup })(SignupPage);
