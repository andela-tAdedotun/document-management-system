import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Pagination, Row, Input } from 'react-materialize';
import DocumentEditor from './DocumentEditor';
import { displayUserDocuments, createDocument, deleteDocument, editDocument }
  from '../../actions/DocumentsActions';
import displaySearchResults from '../../actions/SearchActions';
import DisplayUserDocuments from './DisplayUserDocuments';

/**
 *
 */
class Homepage extends React.Component {

  /**
   * filter - description
   *
   * @param  {type} documents description
   * @param  {type} filterBy  description
   * @return {type}           description
   */
  static filter(documents, filterBy) {
    return documents.filter(document =>
      document.access === filterBy
    );
  }

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
    const searchStatus = this.props.currentState.searchParams.searchParams;
    if (searchStatus.isSearch) {
      const offset = (pageNumber - 1) * 12;
      this.props
        .displaySearchResults(searchStatus.searchQuery, 'documents', offset);
    } else {
      const offset = (pageNumber - 1) * 12;
      this.props.displayUserDocuments(offset);
    }
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
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { documentCreate, documentDelete, documentEdit }
      = this.props;
    let allUserDocuments;
    let paginationInfo;
    let pageCount;
    let currentPage;
    const userDocumentsInStore = this.props
      .currentState.displayUserDocuments.displayUserDocuments;
    const searchStatus = this.props.currentState.searchParams.searchParams;

    if (userDocumentsInStore) {
      if (userDocumentsInStore.paginationInfo) {
        paginationInfo = userDocumentsInStore.paginationInfo;
        pageCount = paginationInfo.pageCount;
        currentPage = paginationInfo.currentPage;
      }

      let userDocuments = userDocumentsInStore.documents;

      if (userDocuments && userDocuments.length > 0) {
        if (this.state.access !== 'all') {
          userDocuments = Homepage
            .filter(userDocuments, this.state.access);
        }
      }

      if (userDocuments && userDocuments.length > 0) {
        allUserDocuments =
         userDocuments.map(document =>
           <div key={document.id}>
             <DisplayUserDocuments
               deleteDocument={documentDelete}
               editDocument={documentEdit}
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
        <div id="homepage-top">
          <Modal
            fixedFooter
            trigger={
              <button
                id="addDocument"
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
            <DocumentEditor createDocument={documentCreate} />
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
        </div>
        <div className="row">
          {
            searchStatus && searchStatus.isSearch
            ?
              <h5 className="searchResult"> Search results: </h5>
            :
            ''
          }
          {allUserDocuments}
        </div>
        {
          pageCount
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
  displayUserDocuments: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
  documentDelete: PropTypes.func.isRequired,
  documentCreate: PropTypes.func.isRequired,
  displaySearchResults: PropTypes.func.isRequired,
  documentEdit: PropTypes.func.isRequired
};


/**
 * mapStateToProps - maps state to props
 *
 * @param  {type} state object representing current state
 * @return {type}       object representing current state
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default connect(mapStateToProps,
  { displayUserDocuments,
    documentCreate: createDocument,
    documentDelete: deleteDocument,
    documentEdit: editDocument,
    displaySearchResults
  })(Homepage);
