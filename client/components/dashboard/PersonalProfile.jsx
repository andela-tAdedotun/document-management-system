import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'react-materialize';
import validate from '../../../shared/Validator';

/**
 * export default - description
 *
 * @param  {type} props description
 * @return {type}       description
 */
class PersonalProfile extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentState.authorization.user.name,
      email: this.props.currentState.authorization.user.email,
      roleId: this.props.currentState.authorization.user.roleId,
      password: '',
      oldPassword: '',
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
      const stateCopy = Object.assign({}, this.state);
      Object.keys(stateCopy).forEach((eachField) => {
        if (!stateCopy[eachField]) {
          delete stateCopy[eachField];
        }
      });
      this.props
      .updateUser(this.props.currentState.authorization.user.id, stateCopy)
      .then(() => {
        Materialize.toast('Account details updated.', 4000);
      })
      .catch((error) => {
        this.setState({ errors: { oldPassword: error.message } });
      });
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
    const user = this.props.currentState.authorization.user;
    const { errors } = this.state;
    return (
      <div className="container">
        <Table className="bordered">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
              <td>
                <Modal
                  trigger={
                    <a className="btn-floating btn-large cyan">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.onSubmit}>
                    <div>
                      <label htmlFor="name">Username</label>
                      <input
                        value={this.state.name}
                        onChange={this.onChange}
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
              <td>{user.email}</td>
              <td>
                <Modal
                  trigger={
                    <a className="btn-floating btn-large cyan">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                      <input
                        value={this.state.email}
                        className="validate active"
                        onChange={this.onChange}
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
                        className="btn  modal-close cyan"
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
                  <form onSubmit={this.onSubmit}>
                    <div>
                      <div className="input-field">
                        <input
                          value={this.state.oldPassword}
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
