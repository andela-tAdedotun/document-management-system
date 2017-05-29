import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { displayUserDocuments, displayDocuments } from './DocumentsActions';
import { getUsers } from './UserActions';
import types from './types';


/**
 * buildSearchResults - description
 *
 * @param  {type} dispatch      the dispatch function
 * @param  {type} apiEndpoint   endpoint to make ajax request to
 * @param  {type} searchQuery   the search query
 * @param  {type} actionType    description
 * @param  {type} payloadName   payload to send in action
 * @param  {type} defaultAction action to dispatch when search ends
 * @return {type}               none
 */
function buildSearchResults(dispatch, apiEndpoint, searchQuery, actionType,
  payloadName, defaultAction) {
  axios.get(apiEndpoint)
      .then((res) => {
        if (searchQuery) {
          dispatch({
            type: actionType,
            [`${payloadName}`]: res.data
          });
        } else {
          dispatch(defaultAction());
        }
      });
}

const displaySearchResults = (searchQuery, location, offset) => {
  const userToken = localStorage.getItem('jwtToken');
  const userData = jwtDecode(userToken);
  const userId = userData.id;
  return (dispatch) => {
    dispatch({
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: true,
        searchQuery
      }
    });
    if (location.match(/documents/)) {
      buildSearchResults(dispatch,
     `/api/search/users/${userId}/documents/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.DISPLAY_USER_DOCUMENTS, 'documents',
          displayUserDocuments);
    } else if (location.match(/explore/)) {
      buildSearchResults(dispatch,
        `/api/search/documents/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.DISPLAY_DOCUMENTS, 'documents',
          displayDocuments);
    } else if (location.match(/dashboard/)) {
      buildSearchResults(dispatch,
        `/api/search/users/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.GET_ALL_USERS, 'allUsers',
          getUsers);
    }
  };
};


export default displaySearchResults;
