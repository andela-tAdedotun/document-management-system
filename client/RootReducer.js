import { combineReducers } from 'redux';
import flashMessages from './reducers/FlashMessages';
import authorization from './reducers/Authorization';
import displayUserDocuments from './reducers/DocumentsReducer';

const appReducer = combineReducers({
  flashMessages,
  authorization,
  displayUserDocuments
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
