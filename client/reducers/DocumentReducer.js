import findIndex from 'lodash/findIndex';
import types from '../actions/Types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.CREATE_NEW_DOCUMENT: {
      const stateCopy = Object.assign({}, state);
      stateCopy.documents.documents.unshift(action.createdDocument);
      return stateCopy;
    }

    case types.DISPLAY_DOCUMENTS: {
      return Object.assign({}, state,
        { documents: action.documents });
    }

    case types.NO_DOCUMENT: {
      return Object.assign({}, state,
        { documents: {
          documents: [],
          paginationInfo: {}
        }
        });
    }

    case types.DELETE_DOCUMENT: {
      return Object.assign({}, state, { documents: {
        paginationInfo: state.documents.paginationInfo,
        documents: [
          ...state.documents.documents.filter(document =>
            document.id !== action.documentId
        )
        ] } });
    }

    case types.EDIT_DOCUMENT: {
      const index =
        findIndex(state.documents.documents, { id: action.documentId });
      return Object.assign({}, state, {
        documents: {
          paginationInfo: state.documents.paginationInfo,
          documents: [
            ...state.documents.documents.slice(0, index),
            action.updatedDocument,
            ...state.documents.documents.slice(index + 1)
          ]
        }
      });
    }

    default: return state;
  }
};
