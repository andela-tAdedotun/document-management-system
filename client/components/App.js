import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './common/Navbar';
import logUserOut from '../actions/LogoutActions';


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
      <div className="parent-container">
        <Navbar logUserOut={logUserOut} />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  logUserOut: PropTypes.func.isRequired
};

export default connect(null, { logUserOut })(App);
