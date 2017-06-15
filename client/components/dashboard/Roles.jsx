import React from 'react';
import PropTypes from 'prop-types';
import Prompt from '../common/Prompt';


/**
 *
 */
class Roles extends React.Component {
  /**
   * constructor - constructor for Roles class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      userRole: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * handleSelect - handler for click event
   *
   * @param  {object} event - the click event
   * @return {void}            none
   */
  handleClick(event) {
    event.preventDefault();
    this.props.deleteRole(this.props.role.id).then(() => {
      Materialize.toast('Role successfully deleted.', 4000);
    });
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
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const role = this.props.role;
    let deleteForbidden;
    if (role.userRole === 'Super Admin' || role.userRole === 'Admin'
        || role.userRole === 'Regular') {
      deleteForbidden = true;
    } else {
      deleteForbidden = false;
    }
    return (
      <tr className="role-rows">
        <td className="role-name"> {role.userRole} </td>
        <td>
          <Prompt
            trigger={
              <button
                disabled={deleteForbidden ? 'disabled' : ''}
                className="btn-floating
                btn-large waves-effect waves-light cyan"
              >
                <i
                  className={deleteForbidden
                    ? 'grey material-icons'
                    : 'red material-icons role-delete-button'}
                >
                    delete
                </i>
              </button>
            }
            onClickFunction={this.handleClick}
            buttonClass="role-delete"
          />
        </td>
      </tr>
    );
  }
}

Roles.propTypes = {
  role: PropTypes.object.isRequired,
  deleteRole: PropTypes.func.isRequired
};

export default Roles;
