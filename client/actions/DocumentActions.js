import axios from 'axios';
import types from './Types';
import { buildDispatchWithGet, buildDispatchWithPost, dispatchAction }
  from '../utilities/DispatchHelper';

/**
 * displayDocuments - gets documents to be put in store
 *
 * @param  {integer} offset - offset for pagination
 * @param  {integer} limit - limit for pagination
 * @param  {boolean} isHomepage - limit for pagination
 * @param  {integer} userId - id of user whose documents are required
 * @return {Promise}       axios ajax call to backend
 */
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

/**
 * createDocument - creates documents to be put in store
 *
 * @param  {object} documentData - document to be created
 * @return {Promise}       axios ajax call to backend
 */
export const createDocument = documentData =>
  dispatch =>
    buildDispatchWithPost(dispatch, '/api/documents', documentData,
    types.CREATE_NEW_DOCUMENT, 'createdDocument');

/**
 * deleteDocument - deletes documents
 *
 * @param  {integer} documentId - id of document to be deleted
 * @return {Promise}       axios ajax call to backend
 */
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

/**
 * editDocument - edits documents
 *
 * @param  {integer} documentId - id of document to be edited
 * @param  {object} documentData - data to edit document with
 * @return {Promise}       axios ajax call to backend
 */
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
