import axios from 'axios';
import types from './Types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/DispatchHelper';

export const displayDocuments = ({ offset, limit, isHomepage, userId }) =>
  (dispatch) => {
    dispatchAction(dispatch, {
      type: types.IS_SEARCH,
      searchPayload: {
        isSearch: false,
        searchQuery: ''
      }
    });

    return buildDispatchWithGet(
      dispatch,
      `/api${isHomepage ? `/users/${userId}` : ''}` +
      `/documents/?offset=${offset}&limit=${limit}`,
      types.DISPLAY_DOCUMENTS,
      'documents'
    )
    .catch(() => {
      dispatchAction(
        dispatch,
        {
          type: types.NO_DOCUMENT,
          errorMessage: 'You have not created any document. Go ahead and ' +
          'create one. It\'s super easy'
        }
      );
    });
  };

export const createDocument = documentData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/documents', documentData,
    types.CREATE_NEW_DOCUMENT, 'createdDocument');

export const deleteDocument = documentId =>
  dispatch => axios.delete(`/api/documents/${documentId}`).then(() => {
    dispatchAction(
      dispatch,
      {
        type: types.DELETE_DOCUMENT,
        documentId
      }
    );
  })
  .catch((res) => {
    dispatchAction(
      dispatch,
      {
        type: types.DOCUMENT_ERROR,
        message: res.data.message
      }
    );
  });

export const editDocument = (documentId, documentData) =>
  dispatch => axios.put(`/api/documents/${documentId}`, documentData)
  .then((res) => {
    dispatchAction(
      dispatch,
      {
        type: types.EDIT_DOCUMENT,
        updatedDocument: res.data,
        documentId
      }
    );
  });
