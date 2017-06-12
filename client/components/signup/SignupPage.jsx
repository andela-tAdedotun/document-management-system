import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import userSignup from '../../actions/SignupAction';


/**
 *
 */
export class SignupPage extends React.Component {


  /**
   * componentWillUnmount - description
   *
   * @return {type}  description
   */
  componentWillUnmount() {
    this.props.currentState.authorization.signUpError = '';
  }
  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <div className="container">
        <SignupForm
          userSignup={this.props.signup}
          authorization={this.props.currentState.authorization}
        />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired
};

/**
 * mapStateToProps - description
 *
 * @param  {type} state description
 * @return {type}       description
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default connect(mapStateToProps, { signup: userSignup })(SignupPage);
