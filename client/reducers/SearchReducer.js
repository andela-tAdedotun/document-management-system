// import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'IS_SEARCH': {
      return action.searchPayload;
    }

    default: return state;
  }
};
