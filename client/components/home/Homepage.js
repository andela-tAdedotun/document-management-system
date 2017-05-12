import React from 'react';
import { connect } from 'react-redux';
import DocumentEditor from './DocumentEditor';
import Navbar from './Navbar';
import logUserOut from '../../actions/LogoutActions';
import { displayUserDocuments } from '../../actions/DocumentsActions';
import DisplayUserDocuments from './DisplayUserDocuments';

/**
 *
 */
class Homepage extends React.Component {
   /**
    * componentDidMount - description
    *
    * @return {type}  description
    */
  componentDidMount() {
    this.props.displayUserDocuments();
  }


  /**
   * render - description
   *
   * @return {type}  description
   */
  render() {
    const { logUserOut } = this.props;
    let allUserDocuments;
    if (this.props.userDocumentsInStore[0] !== undefined) {
      const userDocuments = this.props.userDocumentsInStore[0].userDocuments;
      if (userDocuments) {
        allUserDocuments =
         userDocuments.map(document =>
          <DisplayUserDocuments
            key={document.id}
            document={document}
          />
        );
      } else {
        const noDocumentMessage = this.props.userDocumentsInStore[0].noDocument;
        allUserDocuments = noDocumentMessage;
      }
    }

    return (
      <div id="documents">
        <h3> Here are your documents! </h3>
        <Navbar logUserOut={logUserOut} />
        <div>
          {allUserDocuments}
        </div>
        <DocumentEditor />
      </div>
    );
  }
}

Homepage.propTypes = {
  logUserOut: React.PropTypes.func.isRequired,
  displayUserDocuments: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  userDocumentsInStore: React.PropTypes.array.isRequired
};

// Homepage.defaultProps = {
//   errorMessage: this.props.errorMessage
// };

const mapStateToProps = (state) => {
  return {
    userDocumentsInStore: state.displayUserDocuments
  };
};

export default connect(mapStateToProps,
   { logUserOut, displayUserDocuments })(Homepage);
