import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * anonymous function - checks if component requires authentication
 *
 * @param  {object} ComponentRequiresAuth component to be rendered
 * @return {class} - none
 */
export default function (ComponentRequiresAuth) {
  /**
   *
   */
  class RequiresAuthentication extends React.Component {
    /**
     * componentWillMount - is called before dom renders
     *
     * @return {void}  none
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        browserHistory.push('/');
        Materialize.toast('You need to be signed in to view this page.', 4000);
      }
    }

    /**
     * render - renders dom
     *
     * @return {object}  dom to be rendered
     */
    render() {
      return (
        <ComponentRequiresAuth {...this.props} />
      );
    }
  }

  RequiresAuthentication.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };


  /**
   * mapStateToProps - maps state to props
   *
   * @param  {object} state - object representing current state
   * @return {object}       object representing current state
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.authorization.isAuthenticated
    };
  }

  return connect(mapStateToProps, {})(RequiresAuthentication);
}
