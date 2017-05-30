import findIndex from 'lodash/findIndex';
import types from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.CREATE_NEW_DOCUMENT: {
      const stateCopy = Object.assign({}, state);
      stateCopy.displayUserDocuments.documents.unshift(action.createdDocument);
      return stateCopy;
    }

    case types.DISPLAY_USER_DOCUMENTS: {
      return Object.assign({}, state,
        { displayUserDocuments: action.documents });
    }

    case types.USER_HAS_NO_DOCUMENT: {
      return Object.assign({}, state,
        { displayUserDocuments: {
          documents: [],
          paginationInfo: {}
        }
        });
    }

    case types.DELETE_DOCUMENT: {
      const index =
        findIndex(
          state.displayUserDocuments.documents, { id: action.documentId }
         );
      const stateCopy = Object.assign({}, state);
      stateCopy.displayUserDocuments.documents.splice(index, 1);
      return stateCopy;
    }

    case types.EDIT_DOCUMENT: {
      const index =
        findIndex(
          state.displayUserDocuments.documents, { id: action.documentId }
        );
      const stateCopy = Object.assign({}, state);
      stateCopy.displayUserDocuments.documents[index] = action.updatedDocument;
      return stateCopy;
    }

    default: return state;
  }
};
