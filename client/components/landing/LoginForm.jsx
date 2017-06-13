import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 *
 */
class LoginForm extends React.Component {
  /**
   * constructor - constructor for LoginForm class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleSubmit - handler for submit event
   *
   * @param  {object} event - the submit event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.userLogin(this.state).then(() => {
      browserHistory.push('/documents');
    });
  }

  /**
   * handleChange - handler for onChange event
   *
   * @param  {object} event - the change event
   * @return {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    return (
      <div className="input-field col s12">
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>Email</span>
            <div className="input-field">
              <input
                className="validate"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                id="email"
                name="email" required
              />
            </div>
            <br />
            <br />
            <span>Password</span>
            <div className="input-field">
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <span className="red-text">
              { this.props.authorization.loginError
                ? this.props.authorization.loginError
                : ''
              }
            </span>
            <br />
            <br />
            <button className="btn cyan" type="submit">Enter</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
};

export default LoginForm;
