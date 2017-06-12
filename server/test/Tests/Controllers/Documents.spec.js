import supertest from 'supertest';
import expect from 'expect';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;
const testDocument = databaseData.testDocument;
const invalidDocument = databaseData.invalidDocument;

describe('The Document API', () => {
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

  describe('DOCUMENTS REQUESTS', () => {
    describe('POST: /api/documents', () => {
      it('should create document if required fields are valid', (done) => {
        request.post('/api/documents')
        .set({ Authorization: superAdminToken })
        .send(testDocument)
        .end((err, res) => {
          const expectedResponse =
            {
              access: 'private',
              content: 'Wizzy boy, make me dance...',
              createdAt: res.body.createdAt,
              documentOwnerId: 1,
              id: 10,
              isProtected: true,
              title: 'Daddy Yo',
              updatedAt: res.body.createdAt,
              views: 0
            };
          expect(res.status).toEqual(201);
          expect(res.body).toEqual(expectedResponse);
          done();
        });
      });

      it('should return error if compulsory fields are invalid', (done) => {
        request.post('/api/documents')
        .set({ Authorization: regularUserToken })
        .send(invalidDocument)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toNotBe(undefined);
          done();
        });
      });
    });

    describe('GET: /api/documents', () => {
      it('should return all available documents to super admin', (done) => {
        request.get('/api/documents')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(10);
          done();
        });
      });

      it('should return admin\'s own documents, all regular user' +
      'documents,as well as public documents of anyone', (done) => {
        request.get('/api/documents')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(6);
          done();
        });
      });

      it('should return regular user\'s own documents, ' +
      'as well as public documents of anyone', (done) => {
        request.get('/api/documents')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(5);
          done();
        });
      });

      it('should allow user specify limit and offset', (done) => {
        request.get('/api/documents?limit=3&offset=0')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          const expectedDocuments =
            [
              {
                User: {
                  createdAt: res.body.documents[0].User.createdAt,
                  email: 'taiwo.adedotun@andela.com',
                  id: 1,
                  name: 'Kiniun',
                  roleId: 1,
                  updatedAt: res.body.documents[0].User.updatedAt
                },
                access: 'private',
                content: 'Wizzy boy, make me dance...',
                createdAt: res.body.documents[0].createdAt,
                documentOwnerId: 1,
                id: 1,
                isProtected: true,
                title: 'Daddy Yo',
                updatedAt: res.body.documents[0].updatedAt,
                views: 0
              },
              {
                User: {
                  createdAt: res.body.documents[1].User.createdAt,
                  email: 'kehinde.adedotun@xyz.com',
                  id: 3,
                  name: 'Kehinde Adedotun',
                  roleId: 2,
                  updatedAt: res.body.documents[1].User.updatedAt
                },
                access: 'public',
                content: 'Yeah, when you no dey',
                createdAt: res.body.documents[1].createdAt,
                documentOwnerId: 3,
                id: 2,
                isProtected: false,
                title: 'Soweto Baby',
                updatedAt: res.body.documents[1].updatedAt,
                views: 0
              },
              {
                User: {
                  createdAt: res.body.documents[2].User.createdAt,
                  email: 'taiwo@xyz.com',
                  id: 6,
                  name: 'Ajanlekoko',
                  roleId: 3,
                  updatedAt: res.body.documents[2].User.updatedAt
                },
                access: 'private',
                content: 'I will show you the money o...',
                createdAt: res.body.documents[2].createdAt,
                documentOwnerId: 6,
                id: 3,
                isProtected: false,
                title: 'Dance',
                updatedAt: res.body.documents[2].updatedAt,
                views: 0
              }
            ];

          expect(res.body.documents).toEqual(expectedDocuments);
          expect(res.status).toEqual(200);
          expect(res.body.documents.length).toEqual(3);
          expect(res.body.paginationInfo.pageSize).toEqual(3);
          expect(res.body.paginationInfo.pageCount).toEqual(4);
          expect(res.body.paginationInfo.totalCount).toEqual(10);
          expect(res.body.paginationInfo.currentPage).toEqual(1);
          done();
        });
      });
    });

    describe('GET: /api/documents/:id', () => {
      it('should return any document to super admin', (done) => {
        // document with id 3 is private and belongs to an admin user
        request.get('/api/documents/3')
          .set({ Authorization: superAdminToken })
          .end((err, res) => {
            const expectedDocument = {
              access: 'private',
              content: 'I will show you the money o...',
              createdAt: res.body.createdAt,
              documentOwnerId: 6,
              id: 3,
              isProtected: false,
              title: 'Dance',
              updatedAt: res.body.updatedAt,
              views: 0
            };
            expect(res.body).toEqual(expectedDocument);
            expect(res.status).toEqual(200);
          // document with id 5 has access role and belongs to a regular user
            request.get('/api/documents/5')
              .set({ Authorization: superAdminToken })
              .end((err, res) => {
                const expectedDoc = {
                  access: 'role',
                  content: 'Are you serious? Are you for real?',
                  createdAt: res.body.createdAt,
                  documentOwnerId: 6,
                  id: 5,
                  isProtected: false,
                  title: 'Mercy',
                  updatedAt: res.body.updatedAt,
                  views: 0
                };
                expect(res.body).toEqual(expectedDoc);
                expect(res.status).toEqual(200);
                done();
              });
          });
      });

      it('should return error if admin tries to access super admin\'s' +
      'private or role documents', (done) => {
        request.get('/api/documents/1')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
      });

      it('should return any regular user document for admin', (done) => {
        request.get('/api/documents/3')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          request.get('/api/documents/5')
          .set({ Authorization: adminToken })
          .end((err, res) => {
            const expectedResponse = {
              User: {
                createdAt: res.body.User.createdAt,
                email: 'taiwo@xyz.com',
                id: 6,
                name: 'Ajanlekoko',
                updatedAt: res.body.User.updatedAt
              },
              access: 'role',
              content: 'Are you serious? Are you for real?',
              createdAt: res.body.createdAt,
              documentOwnerId: 6,
              id: 5,
              isProtected: false,
              title: 'Mercy',
              updatedAt: res.body.updatedAt,
              views: 1
            };
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
        });
      });

      it('should return error if regular user tries to access private or ' +
      'role documents of admin or super admin', (done) => {
        request.get('/api/documents/1')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          request.get('/api/documents/4')
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
        });
      });

      it('should return error if document does not exist', (done) => {
        request.get('/api/documents/90')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          request.get('/api/documents/120')
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
        });
      });

      it('should return any public document or role document belonging to ' +
      'regular users to a regular user', (done) => {
        request.get('/api/documents/2')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          request.get('/api/documents/5')
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            done();
          });
        });
      });
    });

    describe('PUT: /api/documents/:id', () => {
      it('should allow super admin to edit any document', (done) => {
        request.put('/api/documents/3')
        .set({ Authorization: superAdminToken })
        .send({ title: 'Tayelolu' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Tayelolu');
          done();
        });
      });

      it('should allow admin to edit document belonging to a regular user ' +
      'and their own', (done) => {
        request.put('/api/documents/5')
        .set({ Authorization: adminToken })
        .send({ title: 'Kehinde' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Kehinde');
          done();
        });
      });

      it('should not allow admin to edit document belonging to another admin ' +
      'or super admin', (done) => {
        request.put('/api/documents/4')
        .set({ Authorization: adminToken })
        .send({ title: 'Kehinde' })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          request.put('/api/documents/1')
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
        });
      });

      it('should not allow regular user edit any document apart from theirs',
       (done) => {
         request.put('/api/documents/2')
         .set({ Authorization: regularUserToken })
         .send({ title: 'Kehinde' })
         .end((err, res) => {
           expect(res.status).toEqual(400);
           request.put('/api/documents/1')
           .set({ Authorization: regularUserToken })
           .end((err, res) => {
             const expectedResponse =
               {
                 message: 'You do not have permission'
               };
             expect(res.status).toEqual(400);
             expect(res.body).toEqual(expectedResponse);
             done();
           });
         });
       });
    });

    describe('DELETE: /api/documents/:id', () => {
      it('should allow super admin delete any document', (done) => {
        request.delete('/api/documents/3')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          request.delete('/api/documents/2')
          .set({ Authorization: superAdminToken })
          .end((err, res) => {
            const expectedResponse =
              {
                message: 'Document deleted.'
              };
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
        });
      });

      it('should allow admin delete regular user documents', (done) => {
        request.delete('/api/documents/9')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          const expectedResponse =
            {
              message: 'Document deleted.'
            };
          expect(res.status).toEqual(200);
          expect(res.body).toEqual(expectedResponse);
          done();
        });
      });

      it('should not allow admin delete super admin or other admin documents',
       (done) => {
         request.delete('/api/documents/6')
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            const expectedResponse = {
              message: 'An error occurred. Check the parameters. ' +
                'Also, you may not have the permission to delete this document.'
            };
            expect(res.body).toEqual(expectedResponse);
            request.delete('/api/documents/4')
             .set({ Authorization: adminToken })
             .end((err, res) => {
               expect(res.status).toEqual(400);
               const expectedRes = {
                 message: 'An error occurred. Check the parameters. ' +
                'Also, you may not have the permission to delete this document.'
               };
               expect(res.body).toEqual(expectedRes);
               done();
             });
          });
       });

      it('should not allow the deletion of protected documents', (done) => {
        request.delete('/api/documents/1')
         .set({ Authorization: superAdminToken })
         .end((err, res) => {
           const expectedResponse =
             {
               message: 'This document is protected. ' +
                'Change this in the settings to delete it.'
             };
           expect(res.status).toEqual(403);
           expect(res.body).toEqual(expectedResponse);
           done();
         });
      });

      it('should allow a regular user to delete their documents and only ' +
      'their documents', (done) => {
        request.delete('/api/documents/5')
         .set({ Authorization: regularUserToken })
         .end((err, res) => {
           const expectedResponse =
             {
               message: 'Document deleted.'
             };
           expect(res.body).toEqual(expectedResponse);
           expect(res.status).toEqual(200);
           request.delete('/api/documents/1')
            .set({ Authorization: regularUserToken })
            .end((err, res) => {
              const expectedRes = {
                message: 'An error occurred. Check the parameters. ' +
               'Also, you may not have the permission to delete this document.'
              };
              expect(res.body).toEqual(expectedRes);
              expect(res.status).toEqual(400);
              done();
            });
         });
      });
    });
  });
});
