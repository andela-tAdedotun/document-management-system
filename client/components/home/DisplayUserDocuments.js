import React from 'react';
import { Row, Modal, Input } from 'react-materialize';

/**
 *
 */
class DisplayUserDocuments extends React.Component {
  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.document.title,
      content: this.props.document.content,
      access: this.props.document.access
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  }


  /**
   * onSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.editDocument(this.props.document.id, this.state);
  }


  /**
   * editDocument - description
   *
   * @return {type}  description
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { title, content } = this.props.document;
    return (
      <div className="col m3">
        <div className="card small #bdbdbd grey lighten-1">
          <div className="card-content black-grey-text">
            <span className="card-title">{title}</span>
            <div>
              {content.slice(0, 150)}{content.length > 150 ? '...' : ''}
            </div>
            <Modal
              header={title}
              trigger={<a href=""> Read More </a>}
            >
              {content}
            </Modal>
          </div>
          <div className="card-action">

            <Modal
              fixedFooter
              trigger={<button className="btn cyan">
                Edit
              </button>}
            >

              <form onSubmit={this.onSubmit}>
                <div>
                  Title: <br />
                  <input
                    name="title"
                    value={this.state.title}
                    type="text"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="input-field">
                  Content: <br />
                  <textarea
                    id="textarea1" className="materialize-textarea"
                    name="content"
                    onChange={this.onChange}
                    value={this.state.content}
                    required
                  />

                  <br />
                </div>

                <div>
                  <Row>
                    <Input
                      s={12}
                      type="select"
                      name="access"
                      label="Who Can Access"
                      onChange={this.onChange}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="role">Role</option>
                    </Input>
                  </Row>
                </div>
                <button className="btn blue" type="submit"> Submit! </button>
              </form>
            </Modal>
            <button className="btn red" onClick={this.deleteDocument}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserDocuments.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  editDocument: React.PropTypes.func.isRequired
};

export default DisplayUserDocuments;
