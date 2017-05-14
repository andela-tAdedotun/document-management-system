export default (state = [], action = {}) => {
  switch (action.type) {
    case 'DISPLAY_DOCUMENTS': {
      return [
        ...state,
        {
          documents: action.documents
        }
      ];
    }

    default: return state;
  }
};
