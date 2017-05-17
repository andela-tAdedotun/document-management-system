/* eslint-disable no-console */
import React from 'react';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
   * onChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * onSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignup(this.state).then(() => {
      browserHistory.push('/documents');
    });
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1> Register for awesomeness! </h1>

        <div>
          <htmlFor>Username</htmlFor>
          <input
            value={this.state.name}
            onChange={this.onChange}
            type="text"
            name="name" required
          />
          <br />
          <br />
          <htmlFor>Email</htmlFor>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            name="email" required
          />
          <br />
          <br />
          <htmlFor>Password</htmlFor>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            placeholder="Enter Password" name="password" required
          />
          <br />
          <br />
          <htmlFor>Re-enter Password</htmlFor>
          <input
            value={this.state.confirmPassword}
            onChange={this.onChange}
            type="password"
            placeholder="Enter Password" name="confirmPassword" required
          />
          <br />
          <br />
          <button type="submit">Oya Signup!</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignup: React.PropTypes.func.isRequired
};

export default SignupForm;
