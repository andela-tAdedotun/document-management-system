import React from 'react';
import { Modal } from 'react-materialize';

/**
 * export default - description
 *
 * @param  {type} props description
 * @return {type}       description
 */
class Roles extends React.Component {
  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      userRole: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
   * onClick - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onClick(event) {
    event.preventDefault();
    this.props.deleteRole(this.props.role.id);
  }
  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const role = this.props.role;
    return (
      <tr>
        <td> {role.userRole} </td>
        <td>
          <button
            onClick={this.deleteUser}
            className="btn-floating
            btn-large waves-effect waves-light cyan"
          >
            <i className="material-icons red">delete</i>
          </button>
        </td>
        <td>
          {''}
        </td>
        <td>
          {''}
        </td>
        <td>
          {''}
        </td>
        <td>
          {''}
        </td>
        <td>
          {''}
        </td>
        <td>
          {''}
        </td>
      </tr>
    );
  }
}

Roles.propTypes = {
  role: React.PropTypes.object.isRequired,
  deleteRole: React.PropTypes.func.isRequired
};

export default Roles;
