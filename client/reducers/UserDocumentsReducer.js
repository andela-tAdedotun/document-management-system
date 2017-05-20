import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'CREATE_NEW_DOCUMENT': {
      return action.userDocuments;
    }

    case 'DISPLAY_USER_DOCUMENTS': {
      return action.userDocuments;
    }

    case 'USER_HAS_NO_DOCUMENT': {
      return [
        ...state,
        {
          noDocument: action.errorMessage
        }
      ];
    }

    case 'DELETE_DOCUMENT': {
      const index =
        findIndex(state[0].userDocuments, { id: action.documentId });
      const stateCopy = [...state];
      stateCopy[0].userDocuments.splice(index, 1);
      return [
        ...stateCopy
      ];
    }

    case 'EDIT_DOCUMENT': {
      const index =
        findIndex(state[0].userDocuments, { id: action.documentId });
      const stateCopy = [...state];
      stateCopy[0].userDocuments[index] = action.updatedDocument;
      return stateCopy;
    }

    default: return state;
  }
};
