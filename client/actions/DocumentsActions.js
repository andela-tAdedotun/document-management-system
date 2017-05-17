import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const displayUserDocuments = () => {
  const userToken = localStorage.getItem('jwtToken');
  const userData = jwtDecode(userToken);
  const userId = userData.id;
  return dispatch => axios.get(`/api/users/${userId}/documents`).then((res) => {
    const userDocuments = res.data.Documents;
    dispatch({
      type: 'DISPLAY_USER_DOCUMENTS',
      userDocuments
    });
  }).catch(() => {
    dispatch({
      type: 'USER_HAS_NO_DOCUMENT',
      errorMessage: `You have not created any document. Go ahead and create one.
      It's super easy`
    });
  });
};

export const displayDocuments = () =>
  dispatch => axios.get('/api/documents').then((res) => {
    const documents = res.data;
    dispatch({
      type: 'DISPLAY_DOCUMENTS',
      documents
    });
  });

export const createDocument = documentData =>
  dispatch => axios.post('api/documents', documentData).then(() => {
    const userToken = localStorage.getItem('jwtToken');
    const userData = jwtDecode(userToken);
    const userId = userData.id;
    axios.get(`/api/users/${userId}/documents`).then((res) => {
      const userDocuments = res.data.Documents;
      dispatch({
        type: 'CREATE_NEW_DOCUMENT',
        userDocuments
      });
    });
  });

export const deleteDocument = documentId =>
  dispatch => axios.delete(`/api/documents/${documentId}`).then(() => {
    dispatch({
      type: 'DELETE_DOCUMENT',
      documentId
    });
  });

export const editDocument = (documentId, documentData) =>
  dispatch => axios.put(`/api/documents/${documentId}`, documentData)
  .then(() => {
    const userToken = localStorage.getItem('jwtToken');
    const userData = jwtDecode(userToken);
    const userId = userData.id;
    axios.get(`/api/users/${userId}/documents`).then((res) => {
      const userDocuments = res.data.Documents;
      dispatch({
        type: 'EDIT_DOCUMENT',
        userDocuments
      });
    });
  });
