import React from 'react';
import { Row, Modal, Input } from 'react-materialize';
import Prompt from '../common/Prompt';

/**
 *
 */
class DisplayDocuments extends React.Component {
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
      access: this.props.document.access,
      isProtected: 'false'
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
    this.props.editDocument(this.props.document.id, this.state, true)
    .then(() => {
      Materialize.toast('Document successfully updated.', 4000);
    });
  }

  /**
   * editDocument - description
   *
   * @return {type}  description
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id, true);
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { title, content } = this.props.document;
    const currentUser = this.props.currentState.authorization.user;
    if (currentUser.roleId === 1 || currentUser.roleId === 2) {
      return (
        <div className="col m3">
          <div className="card hoverable small #bdbdbd grey lighten-1">
            <div className="card-content black-grey-text">
              <span className="card-title">{title}</span>
              <div>
                {content.slice(0, 150)}{content.length > 150 ? '...' : ''}
              </div>
              <br />
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
                trigger={
                  <a className="btn-floating btn-large cyan">
                    <i className="large material-icons">mode_edit</i>
                  </a>
                }
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
                  <div>
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

                  <div>
                    <Row>
                      <Input
                        s={12}
                        type="select"
                        name="isProtected"
                        label="Protected"
                        onChange={this.onChange}
                      >
                        <option value="">Choose</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Input>
                    </Row>
                  </div>
                  <br />
                  <button type="submit" className="cyan btn"> Submit </button>
                </form>
              </Modal>
              <Prompt
                trigger={
                  <button
                    className="btn-floating
                    btn-large waves-effect waves-light cyan right"
                  >
                    <i className="material-icons red">delete</i>
                  </button>
                }
                onClickFunction={this.deleteDocument}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="col m3 cards-container">
        <div className="card small #bdbdbd grey lighten-1">
          <div className="card-content black-grey-text">
            <span className="card-title">{title}</span>
            <div>
              {content.slice(0, 150)}{content.length > 150 ? '...' : ''}
            </div>
            <br />
            <Modal
              header={title}
              trigger={<a href=""> Read More </a>}
            >
              {content}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

DisplayDocuments.propTypes = {
  document: React.PropTypes.object.isRequired,
  currentState: React.PropTypes.object.isRequired,
  editDocument: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired
};

export default DisplayDocuments;
