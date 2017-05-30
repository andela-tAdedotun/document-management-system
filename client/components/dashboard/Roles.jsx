import React from 'react';
import PropTypes from 'prop-types';
import Prompt from '../common/Prompt';

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
    this.props.deleteRole(this.props.role.id).then(() => {
      Materialize.toast('Role successfully deleted.', 4000);
    });
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
          <Prompt
            trigger={
              <button
                className="btn-floating
                btn-large waves-effect waves-light cyan"
              >
                <i className="material-icons red">delete</i>
              </button>
            }
            onClickFunction={this.onClick}
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
