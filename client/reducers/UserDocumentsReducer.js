import findIndex from 'lodash/findIndex';
import types from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.CREATE_NEW_DOCUMENT: {
      return action.userDocuments;
    }

    case types.DISPLAY_USER_DOCUMENTS: {
      return action.documents;
    }

    case types.USER_HAS_NO_DOCUMENT: {
      return action.errorMessage;
    }

    case types.DELETE_DOCUMENT: {
      const index =
        findIndex(state.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.documents.splice(index, 1);
      return stateCopy;
    }

    case types.EDIT_DOCUMENT: {
      const index =
        findIndex(state.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.documents[index] = action.updatedDocument;
      return stateCopy;
    }

    default: return state;
  }
};
