import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import displaySearchResults from '../../actions/SearchActions';

/**
 *
 */
class NavigationBar extends React.Component {
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
    this.onChange = this.onChange.bind(this);
  }


  /**
   * onChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props
      .displaySearchResults(event.target.value, this.props.location);
  }

  /**
   * logOut - logs a user out
   *
   * @param  {type} event
   * @return {type}       none
   */
  logOut(event) {
    event.preventDefault();
    this.props.logUserOut();
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
    let showNavBar;
    if (location.match(/dashboard/)) {
      placeholder = 'Search users...';
      if (currentState.authorization.user.roleId !== 1 &&
       currentState.authorization.user.roleId !== 2) {
        showNavBar = false;
      } else {
        showNavBar = true;
      }
    } else if (location.match(/documents/)) {
      placeholder = 'Search your documents...';
      showNavBar = true;
    } else if (location.match(/explore/)) {
      placeholder = 'Search all documents...';
      showNavBar = true;
    }

    return (
      <nav>
        <div className="nav-wrapper">
          <ul>
            <span className="left"> <Link to="/"> Home </Link> </span>
          </ul>
          {
            authorization.isAuthenticated
            ?
              <div>
                <ul id="nav-mobile" className="right">
                  {
                    showNavBar
                    ?
                      <span>
                        <li>
                          <span id="search-icon">
                            <i className="small material-icons">search</i>
                          </span>
                        </li>
                        <li>
                          <form onSubmit={this.onSubmit}>
                            <input
                              name="searchQuery"
                              id="searchbar"
                              value={searchQuery || ''}
                              placeholder={placeholder}
                              className="validate"
                              onChange={this.onChange}
                            />
                          </form>
                        </li>
                      </span>
                    :
                    ''
                  }
                  <li> <Link to="dashboard"> Dashboard </Link> </li>
                  <li> <Link to="explore"> Explore </Link> </li>
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

NavigationBar.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
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
    currentState: state
  };
}

export default
  connect(mapStateToProps, { displaySearchResults })(NavigationBar);
