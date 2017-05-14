import { combineReducers } from 'redux';
import flashMessages from './reducers/FlashMessages';
import authorization from './reducers/Authorization';
import displayDocuments from './reducers/DocumentsReducer';
import displayUserDocuments from './reducers/UserDocumentsReducer';

const appReducer = combineReducers({
  flashMessages,
  authorization,
  displayUserDocuments,
  displayDocuments
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
