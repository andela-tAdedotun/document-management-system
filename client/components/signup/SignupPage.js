import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import userSignup from '../../actions/SignupActions';
import { addFlashMessage } from '../../actions/FlashMessages';

class SignupPage extends React.Component {

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { userSignup, addFlashMessage } = this.props;
    return (
      <div className="signUp">
        <h3> Welcome to the signup page... </h3>
        <SignupForm userSignup={userSignup} addFlashMessage={addFlashMessage} />
        <Link to="documents"> View your documents! </Link>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignup: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { userSignup, addFlashMessage })(SignupPage);
