export default (state = [], action = {}) => {
  switch (action.type) {
    case 'DISPLAY_USER_DOCUMENTS': {
      return [
        ...state,
        {
          userDocuments: action.userDocuments
        }
      ];
    }

    case 'USER_HAS_NO_DOCUMENT': {
      return [
        ...state,
        {
          noDocument: action.errorMessage
        }
      ];
    }

    default: return state;
  }
};
