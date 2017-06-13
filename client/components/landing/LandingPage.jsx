import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import userLogin from '../../actions/LoginAction';


/**
 *
 */
export class LandingPage extends React.Component {
  /**
   * componentWillUnmount - is called before component is removed
   *
   * @return {void}  none
   */
  componentWillUnmount() {
    // remove error from state when component unmounts
    this.props.currentState.authorization.loginError = '';
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    return (
      <div>
        <div className="container">
          <br />
          <LoginForm
            userLogin={this.props.login}
            authorization={this.props.currentState.authorization}
          />
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  login: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { login: userLogin })(LandingPage);
