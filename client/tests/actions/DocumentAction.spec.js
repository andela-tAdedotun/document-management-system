import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { displayDocuments, createDocument, deleteDocument, editDocument }
  from '../../actions/DocumentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const validDocument = {
  title: 'Mobile Computing',
  content: `Mobile has been much more of a challenge: while Android remains a
   brilliant strategic move, its dominance is rooted more in its business
   model than in its quality (that’s not to denigrate its quality in the
   slightest, particularly the fact that Android runs on so many different
   kinds of devices at so many different price points).`,
  access: 'role',
  documentOwnerId: 1
};

const validResponse = {
  title: 'Mobile Computing',
  content: 'Mobile has been much more of a challenge: while Android remains ' +
   'a brilliant strategic move, its dominance is rooted more in its business ' +
   'model than in its quality (that’s not to denigrate its quality in the ' +
   'slightest, particularly the fact that Android runs on so many different ' +
   'kinds of devices at so many different price points).',
  access: 'role',
  isProtected: false,
  documentOwnerId: 1
};

describe('DocumentActions', () => {
  describe('displayDocuments', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch DISPLAY_DOCUMENTS and IS_SEARCH',
    () => {
      nock('http://localhost:80')
        .get('/api/documents/?offset=undefined&limit=undefined')
        .reply(200, validResponse);

      const expectedAction = [{ type: 'IS_SEARCH',
        searchPayload: { isSearch: false, searchQuery: '' } },
      { type: 'DISPLAY_DOCUMENTS',
        documents:
        { title: 'Mobile Computing',
          content: 'Mobile has been much more of a challenge: while Android ' +
        'remains a brilliant strategic move, its dominance is rooted more in ' +
          'its business model than in its quality (that’s not to denigrate ' +
          'its quality in the slightest, particularly the fact that Android ' +
          'runs on so many different kinds of devices at so many different ' +
          'price points).',
          access: 'role',
          isProtected: false,
          documentOwnerId: 1 } }];

      const store = mockStore({
        documents: []
      });

      store.dispatch(displayDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should dispatch NO_DOCUMENT if there are no documents', () => {
      nock('http://localhost:80')
        .get('/api/documents/?offset=undefined&limit=undefined')
        .reply(400, validResponse);

      const expectedAction = [
        {
          type: 'IS_SEARCH',
          searchPayload: { isSearch: false, searchQuery: '' }
        },
        {
          type: 'NO_DOCUMENT',
          errorMessage: 'You have not created any document. Go ahead and ' +
          'create one. It\'s super easy'
        }
      ];

      const store = mockStore({});

      store.dispatch(displayDocuments({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('createDocument', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch CREATE_NEW_DOCUMENT if document is created', () => {
      nock('http://localhost:80')
        .post('/api/documents', validDocument)
        .reply(201, validDocument);

      const expectedAction = [{
        type: 'CREATE_NEW_DOCUMENT',
        createdDocument: validDocument
      }];

      const store = mockStore({});

      store.dispatch(createDocument(validDocument)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('deleteDocument', () => {
    after(() => {
      nock.cleanAll();
    });

    it('should dispatch DELETE_DOCUMENT if document is deleted', () => {
      nock('http://localhost:80')
        .delete('/api/documents/1')
        .reply(200, {
          message: 'Document deleted.'
        });

      const expectedAction = [{
        type: 'DELETE_DOCUMENT',
        documentId: 1
      }];

      const store = mockStore({});

      store.dispatch(deleteDocument(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it('should dispatch DOCUMENT_ERROR if document cannot be deleted', () => {
      const response = {
        message: 'This document is protected. ' +
       'Change this in the settings to delete it.'
      };

      nock('http://localhost:80')
        .delete('/api/documents/1')
        .reply(403, response);

      const expectedAction = [{
        type: 'DOCUMENT_ERROR',
        message: response.message
      }];

      const store = mockStore({});

      store.dispatch(deleteDocument(1)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });

  describe('editDocument', () => {
    after(() => {
      nock.cleanAll();
    });

    const editedDocument = {
      title: 'Taiwo',
      content:
        'Mobile has been much more of a challenge: while Android remains ' +
  'a brilliant strategic move, its dominance is rooted more in its business ' +
   'model than in its quality (that’s not to denigrate its quality in the ' +
   'slightest, particularly the fact that Android runs on so many different ' +
   'kinds of devices at so many different price points).',
      access: 'role',
      isProtected: false,
      documentOwnerId: 1
    };

    it('should dispatch CREATE_NEW_DOCUMENT if document is created', () => {
      nock('http://localhost:80')
        .put('/api/documents/1', {
          title: 'Taiwo'
        })
        .reply(200, editedDocument);

      const expectedAction = [{
        documentId: 1,
        type: 'EDIT_DOCUMENT',
        updatedDocument: editedDocument
      }];

      const store = mockStore({});

      store.dispatch(editDocument(1, {
        title: 'Taiwo'
      }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
