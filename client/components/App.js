import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    return (
      <div className="parent-container">
        <FlashMessagesList />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
