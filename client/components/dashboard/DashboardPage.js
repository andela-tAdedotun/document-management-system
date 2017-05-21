/* eslint-disable no-shadow */

import React from 'react';
import { connect } from 'react-redux';
import
  { Tabs, Tab, Table, Modal, Row, Input, Pagination } from 'react-materialize';
import logUserOut from '../../actions/LogoutActions';
import PersonalProfile from './PersonalProfile';
import Users from './Users';
import Roles from './Roles';
import { updateUser, getUsers, deleteUser, createUser }
  from '../../actions/UserActions';
import { getRoles, createRole, deleteRole } from '../../actions/RoleActions';


/**
 *
 */
class DashboardPage extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentState.authorization.user;
    this.state = {
      name: '',
      email: '',
      password: '',
      roleId: 3,
      userRole: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createRole = this.createRole.bind(this);
  }


  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    if (this.currentUser.roleId !== 3) {
      this.props.getUsers();
    }

    if (this.currentUser.roleId === 1) {
      this.props.getRoles();
    }
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
   * onSelect - description
   *
   * @param  {type} pageNumber description
   * @return {type}            description
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 15;
    this.props.getUsers(offset);
  }

  /**
   * createUser - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  createUser(event) {
    event.preventDefault();
    this.props.createUser(this.state);
  }

  /**
   * onSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  createRole(event) {
    event.preventDefault();
    this.props.createRole(this.state).then(() => {
      Materialize
      .toast(`You have successfully created role ${this.state.userRole}`, 4000);
    });
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    let paginationInfo;
    let pageCount;
    let currentPage;

    const { logUserOut, currentState, updateUser,
       getUsers, deleteUser, createUser, deleteRole } = this.props;

    let allUsers;
    const usersInStore = this.props.currentState.usersInDatabase;
    if (usersInStore.length !== 0) {
      const users = usersInStore.users;
      paginationInfo = usersInStore.paginationInfo;
      pageCount = paginationInfo.pageCount;
      currentPage = paginationInfo.currentPage;

      allUsers = users.map(eachUser =>
        <Users
          key={eachUser.id}
          {...this.props}
          roleId={this.currentUser.roleId}
          user={eachUser}
        />
      );
    }

    let allRoles;
    const rolesInStore = this.props.currentState.roles[0];
    if (rolesInStore !== undefined) {
      const roles = rolesInStore.allRoles;
      allRoles = roles.map(eachRole =>
        <Roles
          key={eachRole.id}
          {...this.props}
          role={eachRole}
        />
      );
    }

    if (this.currentUser.roleId === 3) {
      return (
        <div>
          <br />
          <PersonalProfile
            updateUser={updateUser}
            currentState={currentState}
            logUserOut={logUserOut}
          />
        </div>
      );
    } else if (this.currentUser.roleId === 1) {
      return (
        <div>
          <br />
          <Tabs className="tabs-fixed-width">

            <Tab title="Your Profile" active><PersonalProfile {...this.props} />
            </Tab>
            <Tab title="Users">
              <br />
              <div className="container">
                <Modal
                  fixedFooter
                  trigger={
                    <a
                      className="btn-floating
                      btn-large waves-effect waves-light cyan"
                    >
                      <i className="material-icons">add</i>
                    </a>
                  }
                >
                  <form onSubmit={this.createUser}>
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
                            name="roleId"
                            label="User's Role"
                            onChange={this.onChange}
                          >
                            <option value={3}>Regular</option>
                            <option value={2}>Admin</option>
                            <option value={1}>Super Admin</option>
                          </Input>
                        </Row>
                      </div>
                      <button className="btn cyan" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </Modal>
                <Table className="bordered">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Email </th>
                      <th> Role </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers}
                  </tbody>
                </Table>

                {
                  allUsers
                  ?
                    <div className="center-align">
                      <Pagination
                        items={pageCount} activePage={currentPage}
                        maxButtons={10}
                        onSelect={this.onSelect}
                      />
                    </div>
                  :
                  ''
                }
              </div>
            </Tab>

            <Tab title="Roles">
              <br />
              <div className="container">
                <Modal
                  trigger={
                    <a
                      className="btn-floating btn-large waves-effect
                      waves-light cyan"
                    >
                      <i className="material-icons">add</i>
                    </a>}
                >
                  <form onSubmit={this.createRole}>
                    <div className="input-field">
                      <input
                        value={this.state.userRole}
                        onChange={this.onChange}
                        type="text"
                        id="userRole"
                        name="userRole" required
                      />
                      <label className="active" htmlFor="userRole">Role</label>

                      <button className="btn cyan" type="submit">Submit</button>
                    </div>
                  </form>
                </Modal>
                <Table className="bordered">
                  <tbody>
                    {allRoles}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    } else if (this.currentUser.roleId === 2) {
      return (
        <div>
          <br />
          <Tabs className="tabs-fixed-width">
            <Tab title="Your Profile" active><PersonalProfile {...this.props} />
            </Tab>
            <Tab title="Users">
              <div className="container">
                <Table className="bordered">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th> Email </th>
                      <th> Role </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    }
  }
}

DashboardPage.propTypes = {
  currentState: React.PropTypes.object.isRequired,
  getUsers: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
  getRoles: React.PropTypes.func.isRequired,
  logUserOut: React.PropTypes.func.isRequired,
  createRole: React.PropTypes.func.isRequired,
  deleteRole: React.PropTypes.func.isRequired
};


/**
 * mapStateToProps - description
 *
 * @param  {type} state description
 * @return {type}       description
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default
connect(mapStateToProps,
  {
    logUserOut,
    updateUser,
    getUsers,
    deleteUser,
    createUser,
    getRoles,
    createRole,
    deleteRole
  })(DashboardPage);
