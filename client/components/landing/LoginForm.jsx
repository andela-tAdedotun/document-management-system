import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 *
 */
class LoginForm extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
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
   * handleSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.userLogin(this.state).then(() => {
      browserHistory.push('/documents');
    });
  }


  /**
   * handleChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * render - description
   *
   * @return {type}  description
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
