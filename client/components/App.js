import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <div className="parent-container">
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
