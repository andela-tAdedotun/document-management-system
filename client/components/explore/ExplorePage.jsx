import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Row, Pagination } from 'react-materialize';
import logUserOut from '../../actions/LogoutAction';
import { displayDocuments, deleteDocument, editDocument }
  from '../../actions/DocumentActions';
import displaySearchResults from '../../actions/SearchActions';
import DisplayDocuments from './DisplayDocuments';

/**
 *
 */
export class ExplorePage extends React.Component {
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
   * constructor - constructor for ExplorePage class
   *
   * @param  {object} props - props for the class
   * @return {void}       none
   */
  constructor(props) {
    super(props);
    this.state = {
      access: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**
   * componentDidMount - is called after dom renders
   *
   * @return {void}  none
   */
  componentDidMount() {
    this.props.displayDocuments({ isHomepage: false });
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
          location: 'explore',
          offset
        });
    } else {
      const offset = (pageNumber - 1) * 12;
      this.props.displayDocuments({ offset, isHomepage: false });
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
    const { documentDelete, documentEdit, currentState }
      = this.props;
    let allDocuments;
    let paginationInfo;
    let pageCount;
    let currentPage;
    let showPrivate;
    const searchStatus = this.props.currentState.searchParams.searchParams;
    const documentsInStore =
      this.props.currentState.allDocuments.documents;
    const currentUser = this.props.currentState.authorization.user;
    if (currentUser.roleId === 1 || currentUser.roleId === 2) {
      showPrivate = true;
    }

    if (documentsInStore) {
      let documentsUserCanSee = documentsInStore.documents;

      if (documentsInStore.paginationInfo) {
        paginationInfo = documentsInStore.paginationInfo;
        pageCount = paginationInfo.pageCount;
        currentPage = paginationInfo.currentPage;
      }

      if (documentsUserCanSee.length > 0) {
        if (this.state.access !== 'all') {
          documentsUserCanSee = ExplorePage
            .filter(documentsUserCanSee, this.state.access);
        }
      }
      if (documentsUserCanSee.length > 0) {
        allDocuments =
         documentsUserCanSee.map(document =>
           <DisplayDocuments
             key={document.id}
             deleteDocument={documentDelete}
             editDocument={documentEdit}
             document={document}
             currentState={currentState}
           />
        );
      } else {
        allDocuments = (<div className="center-align">
          There appears to be no document. Try something else.
        </div>);
      }
    }

    return (
      <div id="documents">
        <br />
        <div id="explore-top">
          <Row className="right">
            {
              showPrivate
              ?
                <Input
                  className="input-field"
                  type="select"
                  name="access"
                  label="Filter:"
                  onChange={this.handleChange}
                >
                  <option value="all">All</option>
                  <option value="public">Public</option>
                  <option value="role">Role</option>
                  <option value="private">Private</option>
                </Input>
              :
                <Input
                  className="input-field"
                  type="select"
                  name="access"
                  label="Filter:"
                  onChange={this.handleChange}
                >
                  <option value="all">All</option>
                  <option value="public">Public</option>
                  <option value="role">Role</option>
                </Input>
            }
          </Row>
        </div>
        <div className="row">
          {
            searchStatus && searchStatus.isSearch
            ?
              <h5 className="searchResult">
                {
                `${documentsInStore.paginationInfo.totalCount} Search Result` +
                `${documentsInStore.paginationInfo.totalCount > 1 ? 's' : ''}:`
                }
              </h5>
            :
            ''
          }
          {allDocuments}
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

ExplorePage.propTypes = {
  displayDocuments: PropTypes.func.isRequired,
  documentDelete: PropTypes.func.isRequired,
  documentEdit: PropTypes.func.isRequired,
  displaySearchResults: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired
};


/**
 * mapStateToProps - maps state to props of component
 *
 * @param  {object} state - current state
 * @return {object}       properties of state to map to props
 */
function mapStateToProps(state) {
  return {
    currentState: state
  };
}

export default connect(mapStateToProps,
  { logUserOut,
    displayDocuments,
    documentEdit: editDocument,
    documentDelete: deleteDocument,
    displaySearchResults
  })(ExplorePage);
