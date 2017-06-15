import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Pagination, Row, Input } from 'react-materialize';
import DocumentEditor from './DocumentEditor';
import { displayDocuments, createDocument, deleteDocument, editDocument }
  from '../../actions/DocumentActions';
import displaySearchResults from '../../actions/SearchActions';
import DisplayUserDocuments from './DisplayUserDocuments';

/**
 *
 */
export class UserDocuments extends React.Component {
  /**
   * filter - filters documents on explore page
   *
   * @param  {array} documents - array of documents to be filtered
   * @param  {string} filterBy  - criterion to filter documents by
   * @return {array}           array of filtered documents
   */
  static filter(documents, filterBy) {
    return documents.filter(document =>
      document.access === filterBy
    );
  }

  /**
   * constructor - constructor for UserDocuments class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      access: 'all'
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * componentDidMount - is called after dom renders
   *
   * @return {void}  none
   */
  componentDidMount() {
    this.props.displayDocuments({
      isHomepage: true,
      userId: this.props.userId
    });
  }

  /**
   * componentWillUnmount - is called before component is removed
   *
   * @return {void}  none
   */
  componentWillUnmount() {
    this.props.currentState.allDocuments = {};
  }

  /**
   * handleSelect - handler for select event
   *
   * @param  {integer} pageNumber - number of page
   * @return {void}            none
   */
  handleSelect(pageNumber) {
    const searchStatus = this.props.currentState.searchParams.searchParams;
    if (searchStatus.isSearch) {
      const offset = (pageNumber - 1) * 12;
      this.props
        .displaySearchResults({
          searchQuery: searchStatus.searchQuery,
          location: 'documents',
          offset
        });
    } else {
      const offset = (pageNumber - 1) * 12;
      this.props.displayDocuments({
        offset,
        isHomepage: true,
        userId: this.props.userId
      });
    }
  }

  /**
   * handleChange - handler for onChange event
   *
   * @param  {object} event - the change event
   * @return {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * render - renders dom
   *
   * @return {object}  dom to be rendered
   */
  render() {
    const { documentCreate, documentDelete, documentEdit }
      = this.props;
    let allUserDocuments;
    let paginationInfo;
    let pageCount;
    let currentPage;
    const userDocumentsInStore = this.props
      .currentState.allDocuments.documents;
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
          userDocuments = UserDocuments
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
            actions={''}
            id="add-document-modal"
            trigger={
              <button
                id="addDocument"
                className="btn-floating btn-large
                waves-effect waves-light cyan"
              >
                <i className="material-icons">add</i>
              </button>
            }
          >
            <DocumentEditor createDocument={documentCreate} />
          </Modal>

          <Row className="right">
            <Input
              className="input-field"
              type="select"
              name="access"
              label="Filter:"
              onChange={this.handleChange}
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
              <h5 className="searchResult">
                {
                `${paginationInfo.totalCount} Search Result` +
                `${paginationInfo.totalCount > 1 ? 's' : ''}:`
                }
              </h5>
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
                handleSelect={this.handleSelect}
              />
            </div>
          :
          ''
        }
      </div>
    );
  }
}

UserDocuments.propTypes = {
  displayDocuments: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  documentDelete: PropTypes.func.isRequired,
  documentCreate: PropTypes.func.isRequired,
  displaySearchResults: PropTypes.func.isRequired,
  documentEdit: PropTypes.func.isRequired
};


/**
 * mapStateToProps - maps state to props
 *
 * @param  {object} state - object representing current state
 * @return {object}       object representing current state
 */
function mapStateToProps(state) {
  return {
    currentState: state,
    userId: state.authorization.user.id
  };
}

export default connect(mapStateToProps,
  { displayDocuments,
    documentCreate: createDocument,
    documentDelete: deleteDocument,
    documentEdit: editDocument,
    displaySearchResults
  })(UserDocuments);
