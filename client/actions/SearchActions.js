import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { displayUserDocuments, displayDocuments } from './DocumentsActions';
import { getUsers } from './UserActions';
import types from './types';

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
      axios.get(`/api/search/users/${userId}/documents/?q=${searchQuery}`)
        .then((res) => {
          if (searchQuery) {
            dispatch({
              type: types.DISPLAY_USER_DOCUMENTS,
              documents: res.data
            });
          } else {
            dispatch(displayUserDocuments());
          }
        });
    } else if (location.match(/explore/)) {
      axios.get(`/api/search/documents/?q=${searchQuery}&offset=${offset}`)
        .then((res) => {
          if (searchQuery) {
            dispatch({
              type: types.DISPLAY_DOCUMENTS,
              documents: res.data
            });
          } else {
            dispatch(displayDocuments());
          }
        });
    } else if (location.match(/dashboard/)) {
      axios.get(`/api/search/users/?q=${searchQuery}&offset=${offset}`)
        .then((res) => {
          if (searchQuery) {
            dispatch({
              type: types.GET_ALL_USERS,
              allUsers: res.data
            });
          } else {
            dispatch(getUsers());
          }
        });
    }
  };
};


export default displaySearchResults;
