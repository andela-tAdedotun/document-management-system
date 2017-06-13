import expect from 'expect';
import types from '../../actions/Types';
import documentReducers from '../../reducers/DocumentReducer';

describe('DocumentReducer', () => {
  const documents = {
    paginationInfo: {
      page_count: 1,
      page: 1,
      page_size: 1,
      total_count: 2
    },
    documents: [
      {
        id: 1,
        title: 'Yaaga',
        content: 'Welcome to my world',
        access: 'public',
        createdAt: '2017-05-23T09:24:47.454Z',
        updatedAt: '2017-05-29T15:05:16.096Z'
      },
      {
        id: 2,
        title: 'Daddy Yo',
        content: 'I get a lot of song she sing song...',
        access: 'private',
        createdAt: '2017-05-23T09:24:47.455Z',
        updatedAt: '2017-06-06T17:42:01.284Z'
      },
    ]
  };

  it('should put all documents in store when handled DISPLAY_DOCUMENTS', () => {
    const state = {};
    const expectedState = {
      documents
    };

    const action = {
      type: types.DISPLAY_DOCUMENTS,
      documents
    };

    const newState = documentReducers(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('should add one document to state if handled CREATE_NEW_DOCUMENT', () => {
    const state = {
      documents
    };
    const newDocument = {
      id: 3,
      title: 'Where',
      content: 'But the DJ can slam so me and you can dance it',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.454Z',
      updatedAt: '2017-05-29T15:05:16.096Z'
    };

    const expectedState = {
      documents: {
        paginationInfo: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 3,
            title: 'Where',
            content: 'But the DJ can slam so me and you can dance it',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 1,
            title: 'Yaaga',
            content: 'Welcome to my world',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Daddy Yo',
            content: 'I get a lot of song she sing song...',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          }
        ]
      }
    };

    const action = {
      type: types.CREATE_NEW_DOCUMENT,
      createdDocument: newDocument
    };

    const newState = documentReducers(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('removes one document from state if handled DELETE_DOCUMENT', () => {
    const state = {
      documents
    };

    const expectedState = {
      documents: {
        paginationInfo: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 3,
            title: 'Where',
            content: 'But the DJ can slam so me and you can dance it',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Daddy Yo',
            content: 'I get a lot of song she sing song...',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          }
        ]
      }
    };

    const action = {
      type: types.DELETE_DOCUMENT,
      documentId: 1
    };

    const newState = documentReducers(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('replaces edited document with updated one if handled EDIT_DOCUMENT',
  () => {
    const state = {
      documents
    };

    const updatedDocument = {
      id: 3,
      title: 'Pana',
      content: 'But the DJ can slam so me and you can dance it',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.454Z',
      updatedAt: '2017-05-29T15:05:16.096Z'
    };

    const expectedState = {
      documents: {
        paginationInfo: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 2
        },
        documents: [
          {
            id: 3,
            title: 'Pana',
            content: 'But the DJ can slam so me and you can dance it',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 1,
            title: 'Yaaga',
            content: 'Welcome to my world',
            access: 'public',
            createdAt: '2017-05-23T09:24:47.454Z',
            updatedAt: '2017-05-29T15:05:16.096Z'
          },
          {
            id: 2,
            title: 'Daddy Yo',
            content: 'I get a lot of song she sing song...',
            access: 'private',
            createdAt: '2017-05-23T09:24:47.455Z',
            updatedAt: '2017-06-06T17:42:01.284Z'
          }
        ]
      }
    };

    const action = {
      type: types.EDIT_DOCUMENT,
      updatedDocument,
      documentId: 3
    };

    const newState = documentReducers(state, action);
    expect(newState).toEqual(expectedState);
  });
});
