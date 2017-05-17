import React from 'react';
import { Table, Modal } from 'react-materialize';

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
      password: ''
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
    const stateCopy = Object.assign({}, this.state);
    Object.keys(stateCopy).forEach((eachField) => {
      if (!stateCopy[eachField]) {
        delete stateCopy[eachField];
      }
    });
    this.props
    .updateUser(this.props.currentState.authorization.user.id, stateCopy);
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const user = this.props.currentState.authorization.user;
    return (
      <div className="container">
        <Table className="bordered">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>******</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <Modal
          fixedFooter
          header="Update Your Profile"
          trigger={
            <a className="btn-floating btn-large cyan">
              <i className="large material-icons">mode_edit</i>
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
              <button className="btn blue" type="submit">Update</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

PersonalProfile.propTypes = {
  currentState: React.PropTypes.object.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

export default PersonalProfile;
