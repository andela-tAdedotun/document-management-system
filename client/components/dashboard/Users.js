import React from 'react';
import { Modal, Row, Input } from 'react-materialize';
import Prompt from '../common/Prompt';
import validate from '../../../shared/Validator';

/**
 * export default - description
 *
 * @param  {type} props description
 * @return {type}       description
 */
class Users extends React.Component {
  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.roles = {
      1: 'Super Admin',
      2: 'Admin',
      3: 'Regular'
    };
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      roleId: this.props.user.RoleId,
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
      .updateUser(this.props.user.id, stateCopy, true).then(() => {
        Materialize.toast('User details successfully updated', 4000);
      })
      .catch(() =>
        Materialize.toast('An error occurred.', 4000)
      );
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
   * deleteUser - description
   *
   * @return {type}  description
   */
  deleteUser() {
    this.props.deleteUser(this.props.user.id);
  }
  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const user = this.props.user;
    const { errors } = this.state;
    return (
      <tr>
        <td> {user.name} </td>
        <td> {user.email} </td>
        <td> {this.roles[user.RoleId]} </td>
        <td>
          <Modal
            fixedFooter
            trigger={
              <a
                className="btn-floating
                btn-large waves-effect waves-light cyan"
              >
                <i className="material-icons">edit</i>
              </a>
          }
          >
            <form onSubmit={this.onSubmit}>
              <div className="input-field">
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  type="text"
                  id="name"
                  name="name"
                />
                <label htmlFor="name" className="active">Username</label>
                <br />
                <br />
                <div className="input-field">
                  <input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    id="email"
                    name="email"
                  />
                  <label className="active" htmlFor="email">Email</label>
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
                    type="password"
                    id="re-password"
                    name="confirmPassword"
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
                <div>
                  <Row>
                    <Input
                      s={12}
                      type="select"
                      name="RoleId"
                      label="User's Role"
                      onChange={this.onChange}
                    >
                      <option value={this.props.user.RoleId}>Unchanged</option>
                      <option value={3}>Regular</option>
                      <option value={2}>Admin</option>
                      <option value={1}>Super Admin</option>
                    </Input>
                  </Row>
                </div>
                <button className="btn cyan" type="submit">Update</button>
              </div>
            </form>
          </Modal>
        </td>
        <td>
          {this.props.roleId === 1
            ?
              <Prompt
                trigger={
                  <button
                    className="btn-floating
                    btn-large waves-effect waves-light cyan"
                  >
                    <i className="material-icons red">delete</i>
                  </button>
                }

                onClickFunction={this.deleteUser}
              />
            :
            ''
          }
        </td>
      </tr>
    );
  }
}

Users.propTypes = {
  user: React.PropTypes.object.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  roleId: React.PropTypes.number.isRequired
};

export default Users;
