import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './common/Navbar';
import logUserOut from '../actions/LogoutAction';
import Footer from './common/Footer';

/**
 * App - top level component for all children component
 *
 * @param  {function} logout - logout function
 * @param  {object} children - children compnents to be rendered
 * @param  {object} location - object representing data about url location
 * @return {object}       dom to be rendered
 */
export const App = ({ logout, children, location }) =>
    (
      <div className="body-wrapper" id="parent-container">
        <NavBar
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
