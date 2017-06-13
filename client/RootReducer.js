import { combineReducers } from 'redux';
import authorization from './reducers/Authorization';
import allDocuments from './reducers/DocumentReducer';
import usersInDatabase from './reducers/UserReducer';
import roles from './reducers/RoleReducer';
import searchParams from './reducers/SearchReducer';

const appReducer = combineReducers({
  authorization,
  allDocuments,
  usersInDatabase,
  roles,
  searchParams
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
