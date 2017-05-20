import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'DISPLAY_DOCUMENTS': {
      return action.documents;
    }

    case 'ADMIN_DELETE_DOCUMENT': {
      const index =
        findIndex(state.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.documents.splice(index, 1);
      return stateCopy;
    }

    case 'ADMIN_EDIT_DOCUMENT': {
      const index =
        findIndex(state.documents, { id: action.documentId });
      const stateCopy = Object.assign({}, state);
      stateCopy.documents[index] = action.updatedDocument;
      return stateCopy;
    }

    default: return state;
  }
};
