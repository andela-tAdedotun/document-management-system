import React from 'react';
import { connect } from 'react-redux';
import { Input, Row } from 'react-materialize';
import Navbar from '../common/Navbar';
import logUserOut from '../../actions/LogoutActions';
import { displayDocuments, deleteDocument, editDocument }
  from '../../actions/DocumentsActions';
import DisplayDocuments from './DisplayDocuments';

/**
 *
 */
class ExplorePage extends React.Component {

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
   * filter - description
   *
   * @param  {type} documents description
   * @param  {type} filterBy  description
   * @return {type}           description
   */
  filter(documents, filterBy) {
    return documents.filter((document) => {
      return document.access === filterBy;
    });
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

    if (this.props.currentState.displayDocuments[0] !== undefined) {
      let documentsUserCanSee =
        this.props.currentState.displayDocuments[0].documents.documents;

      if (documentsUserCanSee.length > 0) {
        if (this.state.access !== 'all') {
          documentsUserCanSee = this
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
        allDocuments = 'noDocumentMessage';
      }
    }

    return (
      <div id="documents">
        <Navbar logUserOut={logUserOut} />
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
          {allDocuments}
        </div>
      </div>
    );
  }
}

ExplorePage.propTypes = {
  logUserOut: React.PropTypes.func.isRequired,
  displayDocuments: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.object.isRequired
};

// Homepage.defaultProps = {
//   errorMessage: this.props.errorMessage
// };

const mapStateToProps = (state) => {
  return {
    currentState: state
  };
};

export default connect(mapStateToProps,
   { logUserOut, displayDocuments, editDocument, deleteDocument })(ExplorePage);
