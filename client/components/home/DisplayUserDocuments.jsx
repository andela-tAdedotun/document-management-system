import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Row, Modal, Input } from 'react-materialize';
import Prompt from '../common/Prompt';
import ProtectedSelect from '../common/ProtectedSelect';

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
      access: this.props.document.access,
      isProtected: 'false'
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handleSubmit - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.editDocument(this.props.document.id, this.state).then(() =>
      Materialize.toast('Update successful.', 4000)
    )
    .catch(() => Materialize.toast('An error occurred.', 4000));
  }


  /**
   * editDocument - description
   *
   * @return {type}  description
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id)
    .catch(error => Materialize.toast(error.message, 4000));
  }

  /**
   * render - description
   *
   * @return {type}  description
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
        <div id="card" className="card hoverable small #bdbdbd grey lighten-1">
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
              {content.slice(0, 90)}{content.length > 90 ? '...' : ''}
            </div>
            {
              content.length > 100
              ?
                <Modal
                  header={title}
                  trigger={<a className="read-more" href=""> Read More </a>}
                >
                  {content}
                </Modal>
              :
              ''
            }
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
                <a className="btn-floating btn-large cyan">
                  <i className="large material-icons">mode_edit</i>
                </a>
              }
            >

              <form onSubmit={this.handleSubmit}>
                <div>
                  Title: <br />
                  <input
                    name="title"
                    value={this.state.title}
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="input-field">
                  Content: <br />
                  <textarea
                    id="textarea1" className="materialize-textarea"
                    name="content"
                    onChange={this.handleChange}
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
                <button className="btn cyan modal-close" type="submit">
                  Submit
                </button>
              </form>
              <button className="btn red modal-close close-modal">Close</button>
            </Modal>
            <Prompt
              trigger={<button
                className="btn-floating
                  btn-large waves-effect waves-light cyan right"
              >
                <i className="material-icons red">delete</i>
              </button>}

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
