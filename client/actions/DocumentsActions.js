import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const displayUserDocuments = (offset, limit) => {
  const userToken = localStorage.getItem('jwtToken');
  const userData = jwtDecode(userToken);
  const userId = userData.id;
  return (dispatch) => {
    dispatch({
      type: 'IS_SEARCH',
      searchPayload: {
        isSearch: false,
        searchQuery: ''
      }
    });
    axios
    .get(`/api/users/${userId}/documents/?offset=${offset}&limit=${limit}`)
    .then((res) => {
      const userDocuments = res.data;
      dispatch({
        type: 'DISPLAY_USER_DOCUMENTS',
        documents: userDocuments
      });
    }).catch(() => {
      dispatch({
        type: 'USER_HAS_NO_DOCUMENT',
        errorMessage: 'You have not created any document. Go ahead and ' +
        'create one. It\'s super easy'
      });
    });
  };
};

export const displayDocuments = (offset, limit) =>
  (dispatch) => {
    dispatch({
      type: 'IS_SEARCH',
      searchPayload: {
        isSearch: false,
        searchQuery: ''
      }
    });
    axios.get(`/api/documents/?offset=${offset}&limit=${limit}`)
      .then((res) => {
        const documents = res.data;
        dispatch({
          type: 'DISPLAY_DOCUMENTS',
          documents
        });
      });
  };

export const createDocument = documentData =>
  dispatch => axios.post('api/documents', documentData).then(() => {
    const userToken = localStorage.getItem('jwtToken');
    const userData = jwtDecode(userToken);
    const userId = userData.id;
    axios.get(`/api/users/${userId}/documents`).then((res) => {
      const userDocuments = res.data;
      dispatch({
        type: 'CREATE_NEW_DOCUMENT',
        userDocuments
      });
    });
  });

export const deleteDocument = (documentId, isAdmin) =>
  dispatch => axios.delete(`/api/documents/${documentId}`).then(() => {
    if (isAdmin) {
      dispatch({
        type: 'ADMIN_DELETE_DOCUMENT',
        documentId
      });
    } else {
      dispatch({
        type: 'DELETE_DOCUMENT',
        documentId
      });
    }
  })
  .catch((res) => { throw new Error(res.data); });

export const editDocument = (documentId, documentData, isAdmin) =>
  dispatch => axios.put(`/api/documents/${documentId}`, documentData)
  .then(() => {
    axios.get(`/api/documents/${documentId}`).then((res) => {
      const updatedDocument = res.data;
      if (isAdmin) {
        dispatch({
          type: 'ADMIN_EDIT_DOCUMENT',
          updatedDocument,
          documentId
        });
      } else {
        dispatch({
          type: 'EDIT_DOCUMENT',
          updatedDocument,
          documentId
        });
      }
    });
  });
