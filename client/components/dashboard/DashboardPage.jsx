import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import
  { Tabs, Tab, Table, Modal, Row, Input, Pagination } from 'react-materialize';
import PersonalProfile from './PersonalProfile';
import Users from './Users';
import Roles from './Roles';
import { updateUser, getUsers, deleteUser, createUser }
  from '../../actions/UserActions';
import { getRoles, createRole, deleteRole } from '../../actions/RoleActions';
import validate from '../../../shared/Validator';


/**
 *
 */
export class DashboardPage extends React.Component {
  /**
   * constructor - constructor for DashboardPage class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentState.authorization.user;
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleId: 3,
      userRole: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createRole = this.createRole.bind(this);
  }


  /**
   * componentDidMount - is called after dom renders
   *
   * @return {void}  none
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
   * handleSelect - handler for select event
   *
   * @param  {integer} pageNumber - number of page
   * @return {void}            none
   */
  handleSelect(pageNumber) {
    // calculate offset for endpoint to get all users. used for pagination
    const offset = (pageNumber - 1) * 15;
    this.props.getUsers(offset);
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
   * createUser - handles creation of user. calls action
   *
   * @param  {object} event - event from button click to create user
   * @return {void}       none
   */
  createUser(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.createUser(this.state).then(() => {
        Materialize
        .toast(`You have successfully created user ${this.state.name}`, 4000);
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
   * createRole - handles creation of roles. calls action.
   *
   * @param  {object} event - event from button click to create role
   * @return {void}
   */
  createRole(event) {
    event.preventDefault();
    this.props.createRole(this.state).then(() => {
      Materialize
      .toast(`You have successfully created role ${this.state.userRole}`, 4000);
    });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const { currentState, userUpdate } = this.props;
    const usersInStore =
      this.props.currentState.usersInDatabase.usersInDatabase;
    const users = usersInStore.users;
    const paginationInfo = usersInStore.paginationInfo;
    const pageCount = paginationInfo.pageCount;
    const currentPage = paginationInfo.currentPage;
    const { errors } = this.state;

    const allUsers = users.map(eachUser =>
      <Users
        key={eachUser.id}
        updateUser={userUpdate}
        {...this.props}
        roleId={this.currentUser.roleId}
        user={eachUser}
      />
    );

    let allRoles;
    const roles = this.props.currentState.roles.allRoles;
    if (roles) {
      allRoles = roles.map(eachRole =>
        <Roles
          key={eachRole.id}
          {...this.props}
          role={eachRole}
        />
      );
    }

    if (this.currentUser.roleId === 3 || this.currentUser.roleId === 2) {
      return (
        <div>
          <br />
          <PersonalProfile
            updateUser={userUpdate}
            currentState={currentState}
          />
        </div>
      );
    }
    return (
      <div>
        <br />
        <Tabs className="tabs-fixed-width">

          <Tab title="Your Profile" active>
            <PersonalProfile {...this.props} updateUser={userUpdate} />
          </Tab>
          <Tab title="Users" className="users">
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
                    <label htmlFor="name">Username</label>
                    <input
                      value={this.state.name}
                      onChange={this.handleChange}
                      type="text"
                      name="name" required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      value={this.state.email}
                      onChange={this.handleChange}
                      type="text"
                      name="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      value={this.state.password}
                      onChange={this.handleChange}
                      type="password"
                      name="password"
                    />
                    <label htmlFor="confirmPassword" className="active">
                      Re-enter password
                    </label>
                    <input
                      value={this.state.confirmPassword}
                      className="validate"
                      onChange={this.handleChange}
                      type="password"
                      name="confirmPassword"
                      required
                    />
                    {
                      errors.confirmPassword &&
                      <span className="red-text">
                        {errors.confirmPassword}
                      </span>
                    }
                    <div>
                      <Row>
                        <Input
                          s={12}
                          type="select"
                          name="roleId"
                          label="User's Role"
                          onChange={this.handleChange}
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
                <tbody className="user-table">
                  {allUsers}
                </tbody>
              </Table>

              {
                pageCount
                ?
                  <div className="center-align">
                    <Pagination
                      items={pageCount} activePage={currentPage}
                      maxButtons={10}
                      onSelect={this.handleSelect}
                    />
                  </div>
                :
                ''
              }
            </div>
          </Tab>

          <Tab title="Roles" className="roles">
            <br />
            <div className="container">
              <Modal
                trigger={
                  <a
                    className="btn-floating btn-large waves-effect
                    waves-light cyan add-role"
                  >
                    <i className="material-icons">add</i>
                  </a>}
              >
                <form onSubmit={this.createRole}>
                  <div className="input-field role-input">
                    <input
                      value={this.state.userRole}
                      onChange={this.handleChange}
                      type="text"
                      id="userRole"
                      name="userRole" required
                    />
                    <label className="active" htmlFor="userRole">Role</label>

                    <button
                      className="btn cyan role-submit modal-close"
                      type="submit"
                    >
                      Submit
                    </button>
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
  }
}

DashboardPage.propTypes = {
  currentState: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  userUpdate: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  createRole: PropTypes.func.isRequired
};


/**
 * mapStateToProps - maps state to props of component
 *
 * @param  {object} state current state
 * @return {object}       properties of state to map to props
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default
connect(mapStateToProps,
  {
    userUpdate: updateUser,
    getUsers,
    deleteUser,
    createUser,
    getRoles,
    createRole,
    deleteRole
  })(DashboardPage);
