import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/dispatchHelper';

export const displayUserDocuments = (offset, limit) => {
  const userToken = localStorage.getItem('jwtToken');
  const userData = jwtDecode(userToken);
  const userId = userData.id;
  return (dispatch) => {
    dispatchAction(dispatch, {
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: false,
        searchQuery: ''
      }
    });
    buildDispatchWithGet(
        dispatch,
        `/api/users/${userId}/documents/?offset=${offset}&limit=${limit}`,
        types.DISPLAY_USER_DOCUMENTS,
        'documents'
      )
      .catch(() => {
        dispatchAction(
          dispatch,
          {
            type: types.USER_HAS_NO_DOCUMENT,
            errorMessage: 'You have not created any document. Go ahead and ' +
            'create one. It\'s super easy'
          }
        );
      });
  };
};

export const displayDocuments = (offset, limit) =>
  (dispatch) => {
    dispatchAction(dispatch,
      {
        type: types.IS_SEARCH,
        searchPayload: {
          isSearch: false,
          searchQuery: ''
        }
      });
    buildDispatchWithGet(
      dispatch,
      `/api/documents/?offset=${offset}&limit=${limit}`,
      types.DISPLAY_DOCUMENTS,
      'documents'
    );
  };

export const createDocument = documentData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/documents', documentData,
    types.CREATE_NEW_DOCUMENT, 'createdDocument');

export const deleteDocument = (documentId, isAdmin) =>
  dispatch => axios.delete(`/api/documents/${documentId}`).then(() => {
    if (isAdmin) {
      dispatchAction(
        dispatch,
        {
          type: types.ADMIN_DELETE_DOCUMENT,
          documentId
        }
      );
    } else {
      dispatchAction(dispatch,
        {
          type: types.DELETE_DOCUMENT,
          documentId
        });
    }
  })
  .catch((res) => { throw new Error(res.data); });

export const editDocument = (documentId, documentData, isAdmin) =>
  dispatch => axios.put(`/api/documents/${documentId}`, documentData)
  .then((res) => {
    if (isAdmin) {
      dispatchAction(
        dispatch,
        {
          type: types.ADMIN_EDIT_DOCUMENT,
          updatedDocument: res.data,
          documentId
        }
    );
    } else {
      dispatchAction(
          dispatch,
        {
          type: types.EDIT_DOCUMENT,
          updatedDocument: res.data,
          documentId
        }
    );
    }
  });
