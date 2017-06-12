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
   * componentWillUnmount - description
   *
   * @return {type}  description
   */
  componentWillUnmount() {
    // remove error from state when component unmounts
    this.props.currentState.authorization.loginError = '';
  }

  /**
   * render - description
   *
   * @return {type}  description
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

export default connect(mapStateToProps, { login: userLogin })(LandingPage);
