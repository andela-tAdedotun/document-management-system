import React from 'react';
import { browserHistory } from 'react-router';


/**
 *
 */
class LoginForm extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
   * onSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userLogin(this.state).then(() => {
      browserHistory.push('/documents');
    })
    .catch(() => {

    });
  }


  /**
   * onChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <div className="col s4">
        <form onSubmit={this.onSubmit}>
          <div>
            <htmlFor>Email</htmlFor>
            <input
              className="validate"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email" required
            />
            <br />
            <br />
            <htmlFor>Password</htmlFor>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              placeholder="Enter Password" name="password" required
            />
            <br />
            <br />
            <button className="btn blue" type="submit">Oya Login!</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLogin: React.PropTypes.func.isRequired
};

export default LoginForm;
