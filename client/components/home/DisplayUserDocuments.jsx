import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import { Row, Modal, Input } from 'react-materialize';
import Prompt from '../common/Prompt';
import ProtectedSelect from '../common/ProtectedSelect';

/**
 *
 */
class DisplayUserDocuments extends React.Component {
  /**
   * constructor - constructor for DisplayUserDocuments class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * handleChange - handler for onChange event
   *
   * @param  {object} event - the change event
   * @return {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handleSubmit - handler for submit event
   *
   * @param  {object} event - the submit event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.editDocument(this.props.document.id, this.state).then(() =>
      Materialize.toast('Update successful.', 4000)
    )
    .catch(() => Materialize.toast('An error occurred.', 4000));
  }


  /**
   * deleteUser - deletes documents from explore page
   *
   * @return {void}  none
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id)
    .catch(error => Materialize.toast(error.message, 4000));
  }

  /**
   * handleEditorChange - handles change event for TinyMCE
   *
   * @param  {type} event - the change event
   * @return {void}       none
   */
  handleEditorChange(event) {
    this.setState({
      content: event.target.getContent()
    });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const document = this.props.document;
    const { title, content } = document;
    const dateCreated =
      moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const lastEdited =
      moment(document.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    const views = document.views;

    return (
      <div className="col m3">
        <div id="card" className="card small hoverable #bdbdbd grey lighten-1">
          <div>
            <span className="right activator info-button" href="#">
              <i className="medium material-icons right">
                info_outline
              </i>
            </span>
            <span>
              {
                document.isProtected
                ?
                  <i id="locked" className="small material-icons">lock</i>
                :
                ''
              }
            </span>
          </div>
          <div className="card-content black-grey-text">
            <span className="card-title">{title}</span>
            <div>
              { renderHTML(content.slice(0, 90)) }
            </div>
            <Modal
              style={{ width: '90%' }}
              header={title}
              trigger={<a className="read-more" href=""> View </a>}
            >
              {renderHTML(content)}
            </Modal>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              <i className="material-icons right">
                close
              </i>
            </span>
            <p>
              <span className="red-text">Created:</span> <br />
              { dateCreated }
            </p>
            <p>
              <span className="red-text">Last edited:</span> <br />
              { lastEdited }
            </p>
            <p> <span className="red-text"> Views: </span> { views } </p>
          </div>
          <div id="card-action" className="card-action">

            <Modal
              style={{ width: '90%', minHeight: '90%' }}
              fixedFooter
              actions={''}
              trigger={
                <a className="btn-floating btn-large cyan edit">
                  <i className="large material-icons" id="edit">mode_edit</i>
                </a>
              }
            >

              <form onSubmit={this.handleSubmit}>
                <div>
                  Title: <br />
                  <Input
                    className="edit-title"
                    name="title"
                    value={this.state.title}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  <TinyMCE
                    content={this.state.content}
                    config={{
                      height: 300,
                      plugins: 'link image code',
                      toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
                  />
                  <br />
                </div>

                <div>
                  <Row>
                    <Input
                      s={12}
                      type="select"
                      name="access"
                      label="Access"
                      onChange={this.handleChange}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="role">Role</option>
                    </Input>
                  </Row>
                </div>

                <div>
                  <ProtectedSelect handleChange={this.handleChange} />
                </div>
                <br />
                <button
                  className="btn cyan modal-close edit-submit"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              <button className="btn red modal-close close-modal">Close</button>
            </Modal>
            <Prompt
              trigger={
                <button
                  className="btn-floating
                  btn-large waves-effect waves-light cyan right delete-button"
                  disabled={document.isProtected ? 'disabled' : ''}
                >
                  <i
                    className={document.isProtected
                      ? 'grey material-icons'
                      : 'red material-icons'}
                  >
                      delete
                  </i>
                </button>
              }
              onClickFunction={this.deleteDocument}
            />
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserDocuments.propTypes = {
  document: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  editDocument: PropTypes.func.isRequired
};

export default DisplayUserDocuments;
