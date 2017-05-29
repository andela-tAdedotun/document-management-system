import React from 'react';
import { connect } from 'react-redux';
import { Input, Row, Pagination } from 'react-materialize';
import logUserOut from '../../actions/LogoutActions';
import { displayDocuments, deleteDocument, editDocument }
  from '../../actions/DocumentsActions';
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
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * componentDidMount - description
   *
   * @return {type}  description
   */
  componentDidMount() {
    this.props.displayDocuments();
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
   * onSelect - description
   *
   * @param  {type} pageNumber description
   * @return {type}            description
   */
  onSelect(pageNumber) {
    const searchStatus = this.props.currentState.searchParams;
    if (searchStatus.isSearch) {
      const offset = (pageNumber - 1) * 12;
      this.props
        .displaySearchResults(searchStatus.searchQuery, 'explore', offset);
    } else {
      const offset = (pageNumber - 1) * 12;
      this.props.displayDocuments(offset);
    }
  }


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { logUserOut, deleteDocument, editDocument, currentState }
      = this.props;
    let allDocuments;
    let paginationInfo;
    let pageCount;
    let currentPage;
    const searchStatus = this.props.currentState.searchParams;

    if (Object.keys(this.props.currentState.displayDocuments).length !== 0) {
      let documentsUserCanSee =
        this.props.currentState.displayDocuments.documents;

      if (this.props.currentState.displayDocuments
      .paginationInfo !== undefined) {
        paginationInfo = this.props.currentState.displayDocuments
        .paginationInfo;
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
             deleteDocument={deleteDocument}
             editDocument={editDocument}
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
            <option value="role">Role</option>
          </Input>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          {
            searchStatus.isSearch
            ?
              <h5 className="searchResult"> Search results: </h5>
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
  logUserOut: React.PropTypes.func.isRequired,
  displayDocuments: React.PropTypes.func.isRequired,
  displaySearchResults: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentState: state
  };
};

export default connect(mapStateToProps,
  { logUserOut,
    displayDocuments,
    editDocument,
    deleteDocument,
    displaySearchResults
  })(ExplorePage);
