import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import validate from '../../../shared/Validator';

/**
 *
 */
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
      confirmPassword: '',
      errors: {}
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
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignup(this.state).then(() => {
        browserHistory.push('/documents');
      })
      .catch(error => Materialize.toast(error.message, 4000));
    }
  }

  /**
   * isValid - description
   *
   * @return {type}  description
   */
  isValid() {
    const { errors, isValid } = validate(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h3> In a bit... </h3>

        <div>
          <div className="input-field">
            <input
              value={this.state.name}
              onChange={this.onChange}
              id="name"
              type="text"
              name="name"
              required
            />
            <label htmlFor="name">Username</label>
          </div>
          <br />
          <br />
          <div className="input-field">
            <input
              value={this.state.email}
              onChange={this.onChange}
              className="validate"
              type="email"
              id="email"
              name="email"
              required
            />
            <label
              htmlFor="email" data-error={errors.email ? errors.email : ''}
            >
              Email
            </label>
            {
              errors.email &&
              <span className="red-text">
                {errors.email}
              </span>
            }
          </div>
          <br />
          <br />
          <div className="input-field">
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              id="password"
              name="password"
              required
            />
            <label htmlFor="password">Password</label>
            {
              errors.password &&
              <span className="red-text">
                {errors.password}
              </span>
            }
          </div>
          <br />
          <br />
          <div className="input-field">
            <input
              value={this.state.confirmPassword}
              onChange={this.onChange}
              id="re-password"
              type="password"
              name="confirmPassword"
              required
            />
            <label htmlFor="re-password">Re-enter Password</label>
            {
              errors.confirmPassword &&
              <span className="red-text">
                {errors.confirmPassword}
              </span>
            }
          </div>
          <br />
          <br />
          <button className="btn cyan" type="submit">Signup</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignup: PropTypes.func.isRequired
};

export default SignupForm;
