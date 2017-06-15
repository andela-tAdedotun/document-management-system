import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Table, Modal } from 'react-materialize';
import validate from '../../../shared/Validator';
/**
 *
 */
class PersonalProfile extends React.Component {

  /**
   * constructor - constructor for PersonalProfile class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentState.authorization.user.name,
      email: this.props.currentState.authorization.user.email,
      password: '',
      oldPassword: '',
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
   * handleSubmit - handler for onSubmit event
   *
   * @param  {object} event - the submit event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      const stateCopy = Object.assign({}, this.state);
      Object.keys(stateCopy).forEach((eachField) => {
        if (!stateCopy[eachField]) {
          delete stateCopy[eachField];
        }
      });
      const currentUserDetails = this.props.currentState.authorization.user;
      this.props
      .updateUser(currentUserDetails, stateCopy)
      .then(() => {
        if (this.state.email !== currentUserDetails.email) {
          browserHistory.push('/');
        }
        Materialize.toast('Account details updated.', 4000);
      })
      .catch((error) => {
        Materialize.toast(error.data.message, 4000);
      });
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
    const user = this.props.currentState.authorization.user;
    const { errors } = this.state;
    return (
      <div className="container">
        <Table className="bordered">
          <tbody>
            <tr>
              <td>Name</td>
              <td className="username">{user.name}</td>
              <td>
                <Modal
                  trigger={
                    <a className="btn-floating btn-large cyan">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <label htmlFor="name">Username</label>
                      <input
                        value={this.state.name}
                        onChange={this.handleChange}
                        type="text"
                        name="name" required
                      />
                      <button
                        className="btn cyan modal-close"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </Modal>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="user-email">{user.email}</td>
              <td>
                <Modal
                  trigger={
                    <a className="btn-floating btn-large cyan email-edit">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.handleSubmit}>
                    <span className="red-text">
                      You will be logged out and required to login
                       with your new email if you change it.
                    </span>
                    <div className="input-field">
                      <input
                        value={this.state.email}
                        className="validate active"
                        onChange={this.handleChange}
                        id="email"
                        type="email"
                        name="email"
                      />
                      {
                        errors.email &&
                        <span className="red-text">
                          {errors.email}
                        </span>
                      }
                      <button
                        className="btn modal-close cyan email-submit"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </Modal>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>******</td>
              <td>
                <Modal
                  trigger={
                    <a className="btn-floating btn-large cyan">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <div className="input-field">
                        <input
                          value={this.state.oldPassword}
                          onChange={this.handleChange}
                          className="validate"
                          type="password"
                          name="oldPassword"
                          required
                        />
                        <label className="active" htmlFor="oldPassword">
                          Old Password
                        </label>
                        {
                          errors.oldPassword &&
                          <span className="red-text">
                            {errors.oldPassword}
                          </span>
                        }
                      </div>
                      <div className="input-field">
                        <input
                          value={this.state.password}
                          className="validate"
                          onChange={this.handleChange}
                          type="password"
                          name="password"
                          required
                        />
                        <label
                          className="active"
                          htmlFor="password"
                        >
                          New Password
                        </label>
                        {
                          errors.password &&
                          <span className="red-text">
                            {errors.password}
                          </span>
                        }
                      </div>
                      <div className="input-field">
                        <input
                          value={this.state.confirmPassword}
                          className="validate"
                          onChange={this.handleChange}
                          type="password"
                          name="confirmPassword"
                          required
                        />
                        <label htmlFor="confirmPassword" className="active">
                          Re-enter password
                        </label>
                        {
                          errors.confirmPassword &&
                          <span className="red-text">
                            {errors.confirmPassword}
                          </span>
                        }
                      </div>
                      <button className="btn cyan" type="submit">Update</button>
                    </div>
                  </form>
                </Modal>
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
      </div>
    );
  }
}

PersonalProfile.propTypes = {
  currentState: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default PersonalProfile;
