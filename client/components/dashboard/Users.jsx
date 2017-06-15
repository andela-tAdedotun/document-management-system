import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Input } from 'react-materialize';
import Prompt from '../common/Prompt';


/**
 *
 */
class Users extends React.Component {
  /**
   * constructor - constructor for Users class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.roles = {
      1: 'Super Admin',
      2: 'Admin',
      3: 'Regular'
    };
    this.state = {
      roleId: this.props.user.roleId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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
    this.props
    .updateUser(this.props.user, this.state, true).then(() => {
      Materialize.toast('User details successfully updated', 4000);
    })
    .catch(() =>
      Materialize.toast('An error occurred.', 4000)
    );
  }

  /**
   * deleteUser - deletes users
   *
   * @return {void}  none
   */
  deleteUser() {
    this.props.deleteUser(this.props.user.id).then(() => {
      Materialize.toast('User successfully deleted', 4000);
    })
    .catch((error) => {
      Materialize.toast(error.message, 4000);
    });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const user = this.props.user;
    return (
      <tr className="user-rows">
        <td className="user-name"> {user.name} </td>
        <td id="user-email"> {user.email} </td>
        <td className="user-role"> {this.roles[user.roleId]} </td>
        <td>
          <Modal
            trigger={
              <a
                className="btn-floating
                admin-edit-user
                btn-large waves-effect waves-light cyan"
              >
                <i className="material-icons">edit</i>
              </a>
          }
          >
            <form onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <Row>
                    <Input
                      s={12}
                      className="role-list"
                      type="select"
                      name="roleId"
                      label="User's Role"
                      onChange={this.handleChange}
                    >
                      <option value={this.props.user.roleId}>Unchanged</option>
                      <option value={3}>Regular</option>
                      <option value={2} className="admin">Admin</option>
                      <option value={1}>Super Admin</option>
                    </Input>
                  </Row>
                </div>
                <button
                  className="btn cyan modal-close role-update"
                  type="submit"
                >
                  Update
                </button>
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
                    btn-large waves-effect waves-light cyan delete-button"
                  >
                    <i className="material-icons red">delete</i>
                  </button>
                }
                onClickFunction={this.deleteUser}
                buttonClass="user-delete"
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
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired
};

export default Users;
