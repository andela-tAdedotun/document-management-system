import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination, Row, Input } from 'react-materialize';
import DocumentEditor from './DocumentEditor';
import logUserOut from '../../actions/LogoutActions';
import { displayUserDocuments, createDocument, deleteDocument, editDocument }
  from '../../actions/DocumentsActions';
import DisplayUserDocuments from './DisplayUserDocuments';

/**
 *
 */
class Homepage extends React.Component {

  /**
   * constructor - description
   *
   * @param  {type} props description
   * @return {type}       description
   */
  constructor(props) {
    super(props);
    this.state = {
      access: 'all'
    };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }
   /**
    * componentDidMount - description
    *
    * @return {type}  description
    */
  componentDidMount() {
    this.props.displayUserDocuments();
  }

  /**
   * onSelect - description
   *
   * @param  {type} pageNumber description
   * @return {type}            description
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 12;
    this.props.displayUserDocuments(offset);
  }

  /**
   * onChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * filter - description
   *
   * @param  {type} documents description
   * @param  {type} filterBy  description
   * @return {type}           description
   */
  filter(documents, filterBy) {
    return documents.filter(document =>
      document.access === filterBy
    );
  }


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { logUserOut, createDocument, deleteDocument, editDocument }
      = this.props;
    let allUserDocuments;
    let paginationInfo;
    let pageCount;
    let currentPage;

    if (this.props.userDocumentsInStore.documents !== undefined) {
      if (this.props.userDocumentsInStore.paginationInfo !== undefined) {
        paginationInfo = this.props.userDocumentsInStore.paginationInfo;
        pageCount = paginationInfo.pageCount;
        currentPage = paginationInfo.currentPage;
      }

      let userDocuments = this.props.userDocumentsInStore.documents.rows;

      if (userDocuments.length > 0) {
        if (this.state.access !== 'all') {
          userDocuments = this
            .filter(userDocuments, this.state.access);
        }
      }

      if (userDocuments.length > 0) {
        allUserDocuments =
         userDocuments.map(document =>
           <div key={document.id}>
             <DisplayUserDocuments
               deleteDocument={deleteDocument}
               editDocument={editDocument}
               documentId={document.id}
               document={document}
             />
           </div>
        );
      } else {
        allUserDocuments = (<div className="center-align">
          There appears to be no document. Try something else.
        </div>);
      }
    }

    return (
      <div id="documents">
        <br />
        <Modal
          fixedFooter
          trigger={
            <button
              className="btn-floating btn-large
              waves-effect waves-light cyan"
            >
              <i className="material-icons">add</i>
            </button>
          }
          modalOptions={{
            complete: () => $('#submit').prop('disabled', false)
          }}
        >
          <DocumentEditor createDocument={createDocument} />
        </Modal>

        <Row className="right">
          <Input
            className="input-field"
            type="select"
            name="access"
            label="Filter:"
            onChange={this.onChange}
          >
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="role">Role</option>
          </Input>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          {allUserDocuments}
        </div>
        {
          allUserDocuments
          ?
            <div className="center-align">
              <Pagination
                items={pageCount} activePage={currentPage}
                maxButtons={10}
                onSelect={this.onSelect}
              />
            </div>
          :
          ''
        }
      </div>
    );
  }
}

Homepage.propTypes = {
  logUserOut: React.PropTypes.func.isRequired,
  displayUserDocuments: React.PropTypes.func.isRequired,
  userDocumentsInStore: React.PropTypes.any.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  createDocument: React.PropTypes.func.isRequired,
  editDocument: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    userDocumentsInStore: state.displayUserDocuments
  };
};

export default connect(mapStateToProps,
  { logUserOut,
    displayUserDocuments,
    createDocument,
    deleteDocument,
    editDocument })(Homepage);
