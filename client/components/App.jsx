import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './common/Navbar';
import logUserOut from '../actions/LogoutAction';
import Footer from './common/Footer';

const App = ({ logout, children, location }) =>
    (
      <div className="body-wrapper" id="parent-container">
        <Navbar
          logUserOut={logout}
          location={location.pathname}
        />
        {children}
        <Footer />
      </div>
    );

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout: logUserOut })(App);
