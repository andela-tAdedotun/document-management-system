import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import userSignup from '../../actions/SignupActions';

class SignupPage extends React.Component {

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { userSignup } = this.props;
    return (
      <div className="signUp">
        <h3> Welcome to the signup page... </h3>
        <SignupForm userSignup={userSignup} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignup: React.PropTypes.func.isRequired
};

export default connect(null, { userSignup })(SignupPage);
