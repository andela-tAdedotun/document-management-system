import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/**
 * anonymous function - description
 *
 * @param  {type} ComponentRequiresAuth description
 * @return {type}                       description
 */
export default function (ComponentRequiresAuth) {

  /**
   *
   */
  class RequiresAuthentication extends React.Component {

    /**
     * componentWillMount - description
     *
     * @return {type}  description
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        browserHistory.push('/');
        Materialize.toast('You need to be signed in to view this page.', 4000);
      }
    }

    /**
     * render - description
     *
     * @return {type}  description
     */
    render() {
      return (
        <ComponentRequiresAuth {...this.props} />
      );
    }
  }

  RequiresAuthentication.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };


  /**
   * mapStateToProps - description
   *
   * @param  {type} state description
   * @return {type}       description
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.authorization.isAuthenticated
    };
  }

  return connect(mapStateToProps, {})(RequiresAuthentication);
}
