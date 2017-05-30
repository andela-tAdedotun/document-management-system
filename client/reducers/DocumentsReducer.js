import findIndex from 'lodash/findIndex';
import types from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.DISPLAY_DOCUMENTS: {
      return Object.assign({}, state, { displayDocuments: action.documents });
    }

    case types.ADMIN_DELETE_DOCUMENT: {
      const index =
        findIndex(state.displayDocuments.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.displayDocuments.documents.splice(index, 1);
      return stateCopy;
    }

    case types.ADMIN_EDIT_DOCUMENT: {
      const index =
        findIndex(state.displayDocuments.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.displayDocuments.documents[index] = action.updatedDocument;
      return stateCopy;
    }

    default: return state;
  }
};
