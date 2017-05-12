import React from 'react';


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
      <button onClick={this.onClick}>
        Log Out!
      </button>
    );
  }
}

NavigationBar.propTypes = {
  logUserOut: React.PropTypes.func.isRequired
};

export default NavigationBar;
