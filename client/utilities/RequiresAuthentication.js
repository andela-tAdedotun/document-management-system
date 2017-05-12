import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addFlashMessage } from '../actions/FlashMessages';


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
        this.props.addFlashMessage({
          type: 'error',
          text: 'You must be signed in to view this page.'
        });
        browserHistory.push('/');
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
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
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

  return connect(mapStateToProps, { addFlashMessage })(RequiresAuthentication);
}
