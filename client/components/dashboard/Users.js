import React from 'react';
import { Modal, Row, Input } from 'react-materialize';

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
      password: ''
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
    const stateCopy = Object.assign({}, this.state);
    Object.keys(stateCopy).forEach((eachField) => {
      if (!stateCopy[eachField]) {
        delete stateCopy[eachField];
      }
    });
    this.props
    .updateUser(this.props.user.id, stateCopy, true);
  }

  /**
   * editDocument - description
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
                  name="email"
                />
                <br />
                <br />
                <htmlFor>Password</htmlFor>
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Enter Password" name="password"
                />
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
                <button className="btn blue" type="submit">Oya Update!</button>
              </div>
            </form>
          </Modal>
        </td>
        <td>
          {this.props.roleId === 1
            ?
              <button
                onClick={this.deleteUser}
                className="btn-floating
                btn-large waves-effect waves-light cyan"
              >
                <i className="material-icons red">delete</i>
              </button>
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
