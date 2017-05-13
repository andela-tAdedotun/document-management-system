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

export const createDocument = documentData =>
  () => axios.post('api/documents', documentData);

export const hello = 'Taiwo';
