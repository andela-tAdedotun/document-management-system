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
class ExplorePage extends React.Component {

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
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    this.props.displayDocuments({ isHomepage: false });
  }


  /**
   * componentWillUnmount - description
   *
   * @return {type}  description
   */
  componentWillUnmount() {
    this.props.currentState.allDocuments = {};
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
        .displaySearchResults(searchStatus.searchQuery, 'explore', offset);
    } else {
      const offset = (pageNumber - 1) * 12;
      this.props.displayDocuments({ offset, isHomepage: false });
    }
  }

  /**
   * handleChange - description
   *
   * @param  {type} event description
   * @return {type}       description
   */
  handleChange(event) {
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
    if (currentUser.roleId === 1 || currentUser.roleId === 1) {
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
              {
                showPrivate
                ?
                  <option value="private">Private</option>
                :
                  <option />
              }
            </Input>
          </Row>
        </div>
        <div className="row">
          {
            searchStatus && searchStatus.isSearch
            ?
              <h5 className="searchResult">
                Search results ({`${documentsInStore.paginationInfo.pageSize} of
                   ${documentsInStore.paginationInfo.totalCount}`}):
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

ExplorePage.propTypes = {
  displayDocuments: PropTypes.func.isRequired,
  documentDelete: PropTypes.func.isRequired,
  documentEdit: PropTypes.func.isRequired,
  displaySearchResults: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired
};


/**
 * mapStateToProps - maps state to props
 *
 * @param  {type} state description
 * @return {type} state
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
