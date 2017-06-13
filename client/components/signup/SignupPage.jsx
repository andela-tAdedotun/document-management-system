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
   * componentWillUnmount - is called before component is removed
   *
   * @return {void}  none
   */
  componentWillUnmount() {
    this.props.currentState.authorization.signUpError = '';
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
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
 * mapStateToProps - maps state to props of component
 *
 * @param  {object} state - current state
 * @return {object}       properties of state to map to props
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default connect(mapStateToProps, { signup: userSignup })(SignupPage);
