import axios from 'axios';
import { displayDocuments } from './DocumentActions';
import { getUsers } from './UserActions';
import types from './Types';

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
          dispatch(defaultAction);
        }
      });
}

/**
* getRoles - performs search on users and documents
*
* @param  {string} location - url location
* @param  {type} searchQuery   the search query
* @param  {integer} offset - offset for pagination
* @param  {integer} userId - id of user whose documents are to be searched
* @return {Promise}       axios ajax call to backend
*/
const SearchActions = ({ searchQuery, location, offset, userId }) =>
  (dispatch) => {
    dispatch({
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: true,
        searchQuery
      }
    });
    if (location.match(/documents/)) {
      return buildSearchResults(dispatch,
     `/api/search/users/${userId}/documents/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.DISPLAY_DOCUMENTS, 'documents',
          displayDocuments({ isHomepage: true, userId }));
    } else if (location.match(/explore/)) {
      return buildSearchResults(dispatch,
        `/api/search/documents/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.DISPLAY_DOCUMENTS, 'documents',
          displayDocuments({ isHomepage: false }));
    } else if (location.match(/dashboard/)) {
      return buildSearchResults(dispatch,
        `/api/search/users/?q=${searchQuery}&offset=${offset}`,
         searchQuery, types.GET_ALL_USERS, 'allUsers',
          getUsers());
    }
  };

export default SearchActions;
