import React from 'react';
// import classnames from 'classnames';

class FlashMessage extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }


  /**
   * onClick - description
   *
   * @return {type}  description
   */
  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

    /**
     * render - description
     *
     * @return {type}  description
     */
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div>
        {text}
        <button onClick={this.onClick}><span>x</span></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;
