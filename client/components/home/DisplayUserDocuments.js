import React from 'react';


/**
 *
 */
class DisplayUserDocuments extends React.Component {
  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { title, content } = this.props.document;
    return (
      <div>
        {title}: {content.slice(0, 25)}...
      </div>
    );
  }
}

DisplayUserDocuments.propTypes = {
  document: React.PropTypes.object.isRequired
};

export default DisplayUserDocuments;
