import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './common/Navbar';
import logUserOut from '../actions/LogoutActions';
import Footer from './common/Footer';

/**
 *
 */
class App extends React.Component {


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { logUserOut } = this.props;
    return (
      <div className="body-wrapper" id="parent-container">
        <Navbar
          logUserOut={logUserOut}
          location={this.props.location.pathname}
        />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logUserOut: PropTypes.func.isRequired
};

export default connect(null, { logUserOut })(App);
