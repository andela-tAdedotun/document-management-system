import React from 'react';
import { Link } from 'react-router';

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
    return (
      <nav>
        <div className="nav-wrapper">
          <ul>
            <span className="left"> <Link to="/"> Home </Link> </span>
          </ul>
          <ul id="nav-mobile" className="right">
            <li> <Link to="dashboard"> Dashboard </Link> </li>
            <li> <Link to="explore"> Explore </Link> </li>
            <li>
              <a href="/logout" className="red" onClick={this.onClick}>
                Log Out!
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  logUserOut: React.PropTypes.func.isRequired
};

export default NavigationBar;
