import React from 'react';
import { Link, browserHistory } from 'react-router';
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
   * logOut - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  logOut(event) {
    event.preventDefault();
    this.props.logUserOut();
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    let placeholder;
    const location = this.props.location;
    const authorization = this.props.currentState.authorization;
    if (location.match(/dashboard/)) {
      placeholder = 'Search users...';
    } else if (location.match(/documents/)) {
      placeholder = 'Search your documents...';
    } else if (location.match(/explore/)) {
      placeholder = 'Search all documents...';
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
                        value={this.props.currentState.searchParams.searchQuery}
                        placeholder={placeholder}
                        className="validate"
                        onChange={this.onChange}
                      />
                    </form>
                  </li>
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
  logUserOut: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.object.isRequired,
  location: React.PropTypes.string.isRequired,
  displaySearchResults: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentState: state
  };
};

export default connect(mapStateToProps, { displaySearchResults })(NavigationBar);
