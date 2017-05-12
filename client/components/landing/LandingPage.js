import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import userLogin from '../../actions/LoginActions';
import { addFlashMessage } from '../../actions/FlashMessages';


/**
 * 
 */
class LandingPage extends React.Component {

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { userLogin, addFlashMessage } = this.props;
    return (
      <div className="signIn">

        <h3> All Your Documents In One Place. </h3>
        <Link to="signup">Sign up here...</Link><br /><br />
        <LoginForm userLogin={userLogin} addFlashMessage={addFlashMessage} />
        {/* <input type="checkbox" checked="checked" /> Remember me */}

      </div>
    );
  }
}

LandingPage.propTypes = {
  userLogin: React.PropTypes.func.isRequired
};

export default connect(null, { userLogin, addFlashMessage })(LandingPage);
