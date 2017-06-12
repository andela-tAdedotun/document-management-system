import supertest from 'supertest';
import expect from 'expect';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;

describe('The search API', () => {
  let superAdminToken;
  let adminToken;
  let regularUserToken;

  before((done) => {
    request.post('/api/users/login')
      .send(superAdminUser)
      .end((error, res) => {
        superAdminToken = `JWT ${res.body.token}`;
        request.post('/api/users/login')
          .send(adminUser)
          .end((err, response) => {
            adminToken = `JWT ${response.body.token}`;
            request.post('/api/users/login')
              .send(regularUser)
              .end((err, res) => {
                regularUserToken = `JWT ${res.body.token}`;
                done();
              });
          });
      });
  });

  describe('GET: /api/search/users', () => {
    it('should return only users that match search criteria', (done) => {
      request.get('/api/search/users?q=taiwo')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = { users:
        [
          {
            id: 1,
            name: 'Kiniun',
            email: 'taiwo.adedotun@andela.com',
            privacy: 'public',
            createdAt: res.body.users[0].createdAt,
            updatedAt: res.body.users[0].updatedAt,
            roleId: 1
          },
          { id: 6,
            name: 'Ajanlekoko',
            email: 'taiwo@xyz.com',
            privacy: 'public',
            createdAt: res.body.users[1].createdAt,
            updatedAt: res.body.users[1].updatedAt,
            roleId: 3
          }
        ],
          paginationInfo: {
            totalCount: 2, currentPage: 1, pageCount: 1, pageSize: 2
          }
        };

        expect(res.status).toEqual(200);
        expect(res.body.users.length).toEqual(2);
        expect(res.body).toEqual(expectedResponse);
        request.get('/api/search/users?q=taiwo')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.users.length).toEqual(2);
          expect(res.body).toEqual(expectedResponse);
          request.get('/api/search/users?q=taiwo')
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.users.length).toEqual(2);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
        });
      });
    });
  });

  describe('GET /api/users/:id/documents/', () => {
    it('should only return documents belonging to user with id', (done) => {
      request.get('/api/search/users/1/documents?q=daddy')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse =
          {
            documents:
            [
              { id: 1,
                title: 'Daddy Yo',
                content: 'Wizzy boy, make me dance...',
                isProtected: true,
                views: 0,
                access: 'private',
                createdAt: res.body.documents[0].createdAt,
                updatedAt: res.body.documents[0].updatedAt,
                documentOwnerId: 1,
              },
              { id: 10,
                title: 'Daddy Yo',
                content: 'Wizzy boy, make me dance...',
                isProtected: true,
                views: 0,
                access: 'private',
                createdAt: res.body.documents[1].createdAt,
                updatedAt: res.body.documents[1].updatedAt,
                documentOwnerId: 1,
              }
            ],
            paginationInfo: {
              totalCount: 2,
              currentPage: 1,
              pageCount: 1,
              pageSize: 2 }
          };
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expectedResponse);
        expect(res.body.documents.length).toEqual(2);
        request.get('/api/search/users/1/documents?q=computing')
          .set({ Authorization: superAdminToken })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.documents.length).toEqual(1);
            done();
          });
      });
    });
  });

  describe('GET: /api/search/documents', () => {
    it('should return search result for any document to super admin',
    (done) => {
      request.get('/api/search/documents?q=daddy')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse =
          {
            documents:
            [
              { id: 1,
                title: 'Daddy Yo',
                content: 'Wizzy boy, make me dance...',
                isProtected: true,
                views: 0,
                access: 'private',
                createdAt: res.body.documents[0].createdAt,
                updatedAt: res.body.documents[0].updatedAt,
                documentOwnerId: 1,
                User: {
                  createdAt: res.body.documents[0].User.createdAt,
                  email: 'taiwo.adedotun@andela.com',
                  id: 1,
                  name: 'Kiniun',
                  roleId: 1,
                  updatedAt: res.body.documents[0].User.updatedAt,
                }
              },
              { id: 8,
                title: 'Daddy',
                content: 'I am gonna search for rhythm while she pulls up...',
                isProtected: false,
                views: 0,
                access: 'public',
                createdAt: res.body.documents[1].createdAt,
                updatedAt: res.body.documents[1].updatedAt,
                documentOwnerId: 3,
                User: {
                  createdAt: res.body.documents[1].User.createdAt,
                  email: 'kehinde.adedotun@xyz.com',
                  id: 3,
                  name: 'Kehinde Adedotun',
                  roleId: 2,
                  updatedAt: res.body.documents[1].User.updatedAt
                }
              },
              { id: 10,
                title: 'Daddy Yo',
                content: 'Wizzy boy, make me dance...',
                isProtected: true,
                views: 0,
                access: 'private',
                createdAt: res.body.documents[2].createdAt,
                updatedAt: res.body.documents[2].updatedAt,
                documentOwnerId: 1,
                User: {
                  createdAt: res.body.documents[2].User.createdAt,
                  email: 'taiwo.adedotun@andela.com',
                  id: 1,
                  name: 'Kiniun',
                  roleId: 1,
                  updatedAt: res.body.documents[2].User.updatedAt
                }
              }
            ],
            paginationInfo: {
              totalCount: 3,
              currentPage: 1,
              pageCount: 1,
              pageSize: 3 }
          };
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expectedResponse);
        expect(res.body.documents.length).toEqual(3);
        request.get('/api/search/documents?q=computing')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(2);
          done();
        });
      });
    });

    it('should allow admin have access to all regular user documents, ' +
    'all public documents, role documents of other admins and their own ' +
     'documents', (done) => {
      request.get('/api/search/documents?q=computing')
      .set({ Authorization: adminToken })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.documents.length).toEqual(0);
        request.get('/api/search/documents?q=baby')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(0);
          done();
        });
      });
    });

    it('should allow regular access have access to their documents, all ' +
     'public documents and role documents of regular users', (done) => {
      request.get('/api/search/documents?q=daddy')
      .set({ Authorization: regularUserToken })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.documents.length).toEqual(1);
        request.get('/api/search/documents?q=baby')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(0);
          done();
        });
      });
    });
  });
});
