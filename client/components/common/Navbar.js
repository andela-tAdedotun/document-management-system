import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
    this.onClick = this.logOut.bind(this);
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
    const authorization = this.props.authorization;
    return (
      <nav>
        <div className="nav-wrapper">
          <ul>
            <span className="left"> <Link to="/"> Home </Link> </span>
          </ul>
          {
            authorization.isAuthenticated

            ?

              <ul id="nav-mobile" className="right">
                <li> <Link to="dashboard"> Dashboard </Link> </li>
                <li> <Link to="explore"> Explore </Link> </li>
                <li>
                  <a href="/logout" className="red" onClick={this.onClick}>
                    Log Out!
                  </a>
                </li>
              </ul>

            :

              <ul id="nav-mobile" className="right">
                <li> <Link to="signup" className="red"> Signup </Link> </li>
              </ul>
          }
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  logUserOut: React.PropTypes.func.isRequired,
  authorization: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authorization: state.authorization
  };
};

export default connect(mapStateToProps, {})(NavigationBar);
