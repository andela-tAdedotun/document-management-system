import React from 'react';
import PropTypes from 'prop-types';
import validate from '../../../shared/Validator';

/**
 *
 */
class SignupForm extends React.Component {
  /**
   * constructor - constructor for SignupForm class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleChange - handler for onChange event
   *
   * @param  {object} event - the change event
   * @return {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handleSubmit - handler for submit event
   *
   * @param  {object} event - the submit event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignup(this.state);
    }
  }

  /**
   * isValid - checks if data is valid
   *
   * @return {boolean}  - boolean value indicating if data is valid or not
   */
  isValid() {
    const { errors, isValid } = validate(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="input-field">
            <input
              value={this.state.name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
          <span className="red-text">
            { this.props.authorization.signUpError
              ? this.props.authorization.signUpError
              : ''
            }
          </span>
          <br />
          <br />
          <button className="btn cyan" type="submit">Signup</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignup: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired
};

export default SignupForm;
