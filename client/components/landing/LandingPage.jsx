import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import userLogin from '../../actions/LoginActions';

const LandingPage = ({ login }) =>
    (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <br />
          <LoginForm userLogin={login} />
        </div>
      </div>
  );


LandingPage.propTypes = {
  login: React.PropTypes.func.isRequired
};

export default connect(null, { login: userLogin })(LandingPage);
