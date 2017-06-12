import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Prompt from '../common/Prompt';
import ProtectedSelect from '../common/ProtectedSelect';

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
    this.props.editDocument(this.props.document.id, this.state, true)
    .then(() => {
      Materialize.toast('Document successfully updated.', 4000);
    });
  }

  /**
   * deleteDocument - description
   *
   * @return {type}  description
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id, true)
      .catch(error => Materialize.toast(error.message, 4000));
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const document = this.props.document;
    const { title, content } = this.props.document;
    const dateCreated =
      moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const lastEdited =
      moment(document.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    const views = document.views;
    const documentOwner = document.User.name;
    let showButtonActions = true;
    const currentUser = this.props.currentState.authorization.user;

    if (currentUser.roleId === 3) {
      showButtonActions = false;
    } else if (currentUser.roleId === 2) {
      if (document.User.roleId === 1) {
        showButtonActions = false;
      } else if (document.User.roleId === 2
        && document.documentOwnerId !== currentUser.id) {
        showButtonActions = false;
      }
    }

    return (
      <div className="col m3">
        <div className="card hoverable small #bdbdbd grey lighten-1">
          <div>
            <span className="right activator info-button" href="#">
              <i className="medium material-icons right">
                info_outline
              </i>
            </span>
            {
              document.isProtected && showButtonActions
              ?
                <i id="locked" className="small material-icons">lock</i>
              :
              ''
            }
          </div>
          <div className="card-content black-grey-text">
            <span className="card-title">{title}</span>
            <div>
              {renderHTML(content.slice(0, 90))}
            </div>
            {
              content.length > 90
              ?
                <Modal
                  style={{ width: '90%' }}
                  header={title}
                  trigger={<a className="read-more" href=""> Read More </a>}
                >
                  {renderHTML(content)}
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
            <p> <span className="red-text">Views:</span> { views } </p>
            <p> <span className="red-text">Owner:</span> { documentOwner } </p>
          </div>
          {
            showButtonActions
            ?
              <div className="card-action">
                <Modal
                  actions={''}
                  trigger={
                    <a className="btn-floating btn-large cyan">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  }
                >
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <ProtectedSelect handleChange={this.handleChange} />
                    </div>
                    <br />
                    <button type="submit" className="cyan btn modal-close">
                      Submit
                    </button>
                  </form>
                  <button className="btn red modal-close close-modal">
                    Close
                  </button>
                </Modal>
                <Prompt
                  trigger={
                    <button
                      className="btn-floating
                      btn-large waves-effect waves-light cyan right"
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
            :
            ''
          }
        </div>
      </div>
    );
  }
}

DisplayDocuments.propTypes = {
  document: PropTypes.object.isRequired,
  currentState: PropTypes.object.isRequired,
  editDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default DisplayDocuments;
