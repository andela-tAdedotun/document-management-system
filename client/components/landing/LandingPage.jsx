import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import userLogin from '../../actions/LoginActions';

const LandingPage = ({ login }) =>
    (
      <div>
        <div className="container">
          <br />
          <LoginForm userLogin={login} />
        </div>
      </div>
  );


LandingPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login: userLogin })(LandingPage);
