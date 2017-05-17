import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Modal } from 'react-materialize';
import DocumentEditor from './DocumentEditor';
import Navbar from '../common/Navbar';
import logUserOut from '../../actions/LogoutActions';
import { displayUserDocuments, createDocument, deleteDocument, editDocument }
  from '../../actions/DocumentsActions';
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
    const { logUserOut, createDocument, deleteDocument, editDocument }
      = this.props;
    let allUserDocuments;
    if (this.props.userDocumentsInStore[0] !== undefined) {
      const userDocuments = this.props.userDocumentsInStore[0].userDocuments;
      if (userDocuments) {
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
        const noDocumentMessage = this.props.userDocumentsInStore[0].noDocument;
        allUserDocuments = noDocumentMessage;
      }
    }

    return (
      <div id="documents">
        <Navbar logUserOut={logUserOut} />
        <br />
        <Modal
          fixedFooter
          trigger={
            <a className="btn-floating btn-large waves-effect waves-light blue">
              <i className="material-icons">add</i>
            </a>}
        >
          <DocumentEditor createDocument={createDocument} />
        </Modal>
        <div className="row">
          {allUserDocuments}
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  logUserOut: React.PropTypes.func.isRequired,
  displayUserDocuments: React.PropTypes.func.isRequired,
  userDocumentsInStore: React.PropTypes.array.isRequired,
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
