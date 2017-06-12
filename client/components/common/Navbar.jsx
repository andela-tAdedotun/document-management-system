import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import displaySearchResults from '../../actions/SearchActions';

/**
 *
 */
export class NavBar extends React.Component {
  /**
   * handleSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  static handleSubmit(event) {
    event.preventDefault();
  }

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.onClick = this.logOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * handleChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props
      .displaySearchResults({
        searchQuery: event.target.value,
        location: this.props.location,
        userId: this.props.authorization.user.id
      });
  }

  /**
   * logOut - logs a user out
   *
   * @param  {type} event
   * @return {type}       none
   */
  logOut(event) {
    event.preventDefault();
    this.props.logUserOut().then(() => {
      browserHistory.push('/');
    });
  }

  /**
   * render - renders dom
   *
   * @return {type}  description
   */
  render() {
    let placeholder;
    const location = this.props.location;
    const currentState = this.props.currentState;
    const authorization = currentState.authorization;
    const searchQuery = currentState.searchParams.searchParams.searchQuery;
    let showNavBarItems;
    if (location.match(/dashboard/)) {
      placeholder = 'Search users...';
      if (currentState.authorization.user.roleId !== 1 &&
       currentState.authorization.user.roleId !== 2) {
        showNavBarItems = false;
      } else {
        showNavBarItems = true;
      }
    } else if (location.match(/documents/)) {
      placeholder = 'Search your documents...';
      showNavBarItems = true;
    } else if (location.match(/explore/)) {
      placeholder = 'Search all documents...';
      showNavBarItems = true;
    }

    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="left">
            <li className={location.match(/documents/) ? 'active' : ''}>
              <Link to="/"> Home </Link>
            </li>
          </ul>
          {
            authorization.isAuthenticated
            ?
              <div>
                <ul id="nav-mobile" className="right">
                  {
                    showNavBarItems
                    ?
                      <span>
                        <li>
                          <span id="search-icon">
                            <i className="small material-icons">search</i>
                          </span>
                        </li>
                        <li>
                          <form onSubmit={NavBar.handleSubmit}>
                            <input
                              name="searchQuery"
                              id="searchbar"
                              value={searchQuery || ''}
                              placeholder={placeholder}
                              className="validate"
                              onChange={this.handleChange}
                            />
                          </form>
                        </li>
                      </span>
                    :
                    ''
                  }
                  <li className={location.match(/dashboard/) ? 'active' : ''}>
                    <Link to="dashboard"> Dashboard </Link>
                  </li>
                  <li className={location.match(/explore/) ? 'active' : ''}>
                    <Link to="explore"> Explore </Link>
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="red"
                      id="logout"
                      onClick={this.onClick}
                    >
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            :
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="signup" id="signup" className="red"> Signup </Link>
                </li>
              </ul>
          }
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
  authorization: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  displaySearchResults: PropTypes.func.isRequired
};


/**
 * mapStateToProps - maps state to props
 *
 * @param  {type} state
 * @return {type} state
 */
function mapStateToProps(state) {
  return {
    currentState: state,
    authorization: state.authorization
  };
}

export default
  connect(mapStateToProps, { displaySearchResults })(NavBar);
