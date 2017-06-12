import supertest from 'supertest';
import expect from 'expect';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;
const regularUser3 = databaseData.regularUser3;

const invalidUser = databaseData.invalidUser;
const validUser = databaseData.validUser;
const validUser2 = databaseData.validUser2;

describe('The User API', () => {
  let superAdminToken;
  let adminToken;
  let regularUserToken;
  let regularUser3Token;

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
                request.post('/api/users/login')
                  .send(regularUser3)
                  .end((err, res) => {
                    regularUser3Token = `JWT ${res.body.token}`;
                    done();
                  });
              });
          });
      });
  });

  describe('POST: /api/users', () => {
    it('should not create a user if email already exists', (done) => {
      request.post('/api/users')
        .send(adminUser)
        .end((err, res) => {
          const expectedResponse =
            {
              message: 'Email already exists. Use another.'
            };
          expect(res.status).toEqual(400);
          expect(res.body).toEqual(expectedResponse);
          done();
        });
    });

    it('should raise error if roleId is in body but user is not ' +
    'super admin or authorized',
    () => {
      const userWithRoleId = {
        name: 'African Queen',
        email: 'african@queen.com',
        password: 'african',
        roleId: 2
      };

      request.post('/api/users')
        .send(userWithRoleId)
        .end((err, res) => {
          const expectedResponse = {
            message: 'You are not allowed to do post role id.'
          };
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(403);
        });
    });

    it('should not create a user if any field is invalid', (done) => {
      request.post('/api/users')
        .send(invalidUser)
        .end((err, res) => {
          const expectedResponse =
            {
              message: 'Invalid signup parameters.'
            };
          expect(res.status).toEqual(400);
          expect(res.body).toEqual(expectedResponse);
          done();
        });
    });

    it('should create user if fields are valid and user does not exist',
     (done) => {
       request.post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toIncludeKey('token');
          expect(res.body).toIncludeKey('user');
          done();
        });
     });

    it('should send user\'s jwt token and details as response',
      (done) => {
        request.post('/api/users')
         .send(validUser2)
         .end((err, res) => {
           expect(res.status).toEqual(201);
           expect(res.body).toIncludeKey('token');
           expect(res.body.token).toNotEqual(undefined);
           done();
         });
      });
  });

  describe('GET: /api/users', () => {
    it('is accessible to all users', (done) => {
      request.get('/api/users')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.users.length).toEqual(10);
          request.get('/api/users')
            .set({ Authorization: adminToken })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect(res.body.users.length).toEqual(10);
              request.get('/api/users')
                .set({ Authorization: regularUserToken })
                .end((err, res) => {
                  expect(res.status).toEqual(200);
                  expect(res.body.users.length).toEqual(10);
                  done();
                });
            });
        });
    });
  });

  describe('GET: /api/users/:id', () => {
    it('is accessible to all users', (done) => {
      request.get('/api/users/1')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          const expectedResponse =
            {
              id: 1,
              name: 'Taiwo Adedotun',
              email: 'taiwo.adedotun@andela.com',
              roleId: 1
            };
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(200);
          request.get('/api/users/2')
            .set({ Authorization: adminToken })
            .end((err, res) => {
              const expectedRes = {
                id: 2,
                name: 'Sola Adigun',
                email: 'sola@adigun.com',
                roleId: 1
              };
              expect(res.status).toEqual(200);
              expect(res.body).toEqual(expectedRes);
              request.get('/api/users/1')
                .set({ Authorization: regularUserToken })
                .end((err, res) => {
                  expect(res.status).toEqual(200);
                  done();
                });
            });
        });
    });

    it('should return an error if id supplied does not exist',
      (done) => {
        request.get('/api/users/44')
         .set({ Authorization: superAdminToken })
         .end((err, res) => {
           const expectedResponse = {
             message: 'User not found'
           };
           expect(res.status).toEqual(404);
           expect(res.body).toEqual(expectedResponse);
           done();
         });
      });

    it('should return an error if id is not an integer',
      (done) => {
        request.get('/api/users/taiwo')
         .set({ Authorization: superAdminToken })
         .end((err, res) => {
           expect(res.body).toIncludeKey('message');
           expect(res.status).toEqual(400);
           done();
         });
      });
  });

  describe('GET: /api/users/:id/documents', () => {
    it('should allow super admin access any user\'s documents', (done) => {
      request.get('/api/users/1/documents')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
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
              documentOwnerId: 1
            },
            { id: 6,
              title: 'Mobile Computing',
              content:
      'Mobile has been much more of a challenge: while Android remains' +
      ' a brilliant strategic move, its dominance is rooted more in its ' +
      'business model than in its quality (that’s not to denigrate its ' +
      'quality in the slightest, particularly the fact that Android runs on ' +
      'so many different kinds of devices at so many different price points).',
              isProtected: false,
              views: 0,
              access: 'role',
              createdAt: res.body.documents[1].createdAt,
              updatedAt: res.body.documents[1].updatedAt,
              documentOwnerId: 1
            }
          ],
          paginationInfo: {
            totalCount: 2,
            currentPage: 1,
            pageCount: 1,
            pageSize: 2
          }
        };
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expectedResponse);
        request.get('/api/users/4/documents')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          done();
        });
      });
    });

    it('should return an error if user id supplied does not exist',
      (done) => {
        request.get('/api/users/44/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           expect(res.status).toEqual(404);
           done();
         });
      });

    it('should return an error if user has no document',
      (done) => {
        request.get('/api/users/8/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           const expectedResponse = {
             message: 'No documents yet.'
           };
           expect(res.status).toEqual(404);
           expect(res.body).toEqual(expectedResponse);
           done();
         });
      });

    it('should return an error if id is invalid',
      (done) => {
        request.get('/api/users/taiwo/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           expect(res.status).toEqual(400);
           expect(res.body).toIncludeKey('message');
           done();
         });
      });

    it('should only allow regular users access public documents of others,' +
    'role documents of other regular users and their own documents', (done) => {
      request.get('/api/users/1/documents')
       .set({ Authorization: regularUserToken })
       .end((err, res) => {
         expect(res.status).toEqual(404);
         done();
       });
    });
  });

  describe('PUT: /api/users/:id/', () => {
    it('should return error if user does not exist', (done) => {
      request.put('/api/users/22')
      .send({ name: 'Taiwo' })
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          message:
      'You have sent a bad request. User with that id probably does not exist.'
        };
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
    });

    it('should not be accessible to unauthenticated users', (done) => {
      request.put('/api/users/6')
      .send({ name: 'Taiwo' })
      .end((err, res) => {
        expect(res.status).toEqual(401);
        done();
      });
    });

    it('should allow super admin to update any user', (done) => {
      request.put('/api/users/1')
      .send({ name: 'Kiniun' })
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          id: 1,
          name: 'Kiniun',
          email: 'taiwo.adedotun@andela.com',
          roleId: 1
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(200);
        request.get('/api/users/1')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          const expectedRes = { id: 1,
            name: 'Kiniun',
            email: 'taiwo.adedotun@andela.com',
            roleId: 1
          };
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Kiniun');
          expect(res.body).toEqual(expectedRes);
          request.put('/api/users/2')
          .send({ email: 'ejanla@yahoo.com' })
          .set({ Authorization: superAdminToken })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            request.get('/api/users/2')
            .set({ Authorization: superAdminToken })
            .end((err, res) => {
              const expectedUser = { id: 2,
                name: 'Sola Adigun',
                email: 'ejanla@yahoo.com',
                roleId: 1
              };
              expect(res.status).toEqual(200);
              expect(res.body).toEqual(expectedUser);
              expect(res.body.email).toEqual('ejanla@yahoo.com');
              done();
            });
          });
        });
      });
    });

    it('should not allow an admin edit super admin or another admin',
      (done) => {
        request.put('/api/users/1')
        .send({ name: 'Kiniun' })
        .set({ Authorization: adminToken })
        .end((err, res) => {
          const expectedResponse = {
            message: 'You are not authorized to do that.'
          };
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(403);
          request.put('/api/users/4')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.body).toEqual(expectedResponse);
            expect(res.status).toEqual(403);
            done();
          });
        });
      });

    it('should not allow an admin edit super admin or another admin',
      (done) => {
        request.put('/api/users/1')
        .send({ name: 'Kiniun' })
        .set({ Authorization: adminToken })
        .end((err, res) => {
          const expectedResponse = {
            message: 'You are not authorized to do that.'
          };
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(403);
          request.put('/api/users/4')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.body).toEqual(expectedResponse);
            expect(res.status).toEqual(403);
            done();
          });
        });
      });

    it('should allow a regular user to edit only themself',
      (done) => {
        request.put('/api/users/2')
        .send({ name: 'Kiniun' })
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          const expectedResponse = {
            message: 'You are not authorized to do that.'
          };
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(403);
          request.put('/api/users/6')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            const expectedRes = {
              id: 6,
              name: 'Ajanlekoko',
              email: 'taiwo@xyz.com',
              roleId: 3
            };
            expect(res.body).toEqual(expectedRes);
            expect(res.status).toEqual(200);
            request.put('/api/users/7')
            .send({ name: 'Ajanlekoko' })
            .set({ Authorization: regularUserToken })
            .end((err, res) => {
              expect(res.body).toEqual(expectedResponse);
              expect(res.status).toEqual(403);
              done();
            });
          });
        });
      });

    it('should not allow update of password if old password is not supplied',
    (done) => {
      request.put('/api/users/6')
      .send({ password: 'Ajanlekoko' })
      .set({ Authorization: regularUserToken })
      .end((err, res) => {
        expect(res.status).toEqual(403);
        done();
      });
    });

    it('should not allow update of password if old password supplied is wrong',
    (done) => {
      request.put('/api/users/6')
      .send({
        password: 'Ajanlekoko',
        oldPassword: '909090'
      })
      .set({ Authorization: regularUserToken })
      .end((err, res) => {
        const expectedResponse = {
          type: 'Invalid password',
          message: 'Incorrect old password. Try again.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(403);
        done();
      });
    });

    it('should allow password update if old password supplied is correct',
    (done) => {
      request.put('/api/users/8')
      .send({
        password: 'Ajanlekoko',
        oldPassword: 'adeshola'
      })
      .set({ Authorization: regularUser3Token })
      .end((err, res) => {
        const expectedResponse = { id: 8,
          name: 'Adeshola Barbie',
          email: 'adeshola@test.com',
          roleId: 3
        };
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
    });

    it('should return error if request is invalid',
    (done) => {
      request.put('/api/users/taiwo')
      .send({
        password: 'Ajanlekoko',
        oldPassword: '123456'
      })
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          message:
      'You have sent a bad request. User with that id probably does not exist.'
        };
        expect(res.status).toEqual(400);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
    });
  });

  describe('DELETE: /api/users/:id', () => {
    it('is only accessible to a super admin', () => {
      request.delete('/api/users/2')
      .set({ Authorization: adminToken })
      .end((err, res) => {
        const expectedResponse = {
          message: 'Only a super admin can do that.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(403);
        request.delete('/api/users/6')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.body).toEqual(expectedResponse);
          expect(res.status).toEqual(403);
        });
      });
    });

    it('should not allow the deletion of super admin', () => {
      request.delete('/api/users/1')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          message: 'This app needs a super admin. ' +
            'You cannot perform this operation.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(403);
      });
    });

    it('should return error if user does not exist', (done) => {
      request.delete('/api/users/22')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          message: 'User not found'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(404);
        done();
      });
    });

    it('should return error if request is invalid',
    (done) => {
      request.delete('/api/users/kehinde')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.body).toIncludeKey('message');
        expect(res.status).toEqual(400);
        done();
      });
    });

    it('should delete user if super admin deletes a user that exists',
    (done) => {
      request.delete('/api/users/9')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        const expectedResponse = {
          message: 'User successfully deleted.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(200);
        done();
      });
    });
  });

  describe('POST: /api/users/login', () => {
    it('should not log user in if email or password is not provided',
     (done) => {
       request.post('/api/users/login')
       .send({
         email: 'sola@adigun.com'
       })
       .end((err, res) => {
         const expectedResponse = {
           message: 'Please input your email and password'
         };
         expect(res.body).toEqual(expectedResponse);
         expect(res.status).toEqual(400);
         request.post('/api/users/login')
         .send({
           password: 'adigun'
         })
         .end((err, res) => {
           expect(res.body).toEqual(expectedResponse);
           expect(res.status).toEqual(400);
           done();
         });
       });
     });

    it('should not log user in if email does not exist in database', (done) => {
      request.post('/api/users/login')
      .send({
        email: 'invalid@email.com',
        password: '123456'
      })
      .end((err, res) => {
        const expectedResponse = {
          message: 'No user with that email exists.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(401);
        done();
      });
    });

    it('should not log user in if password provided is invalid', (done) => {
      request.post('/api/users/login')
      .send({
        email: 'taiwo.adedotun@andela.com',
        password: 'taiwo'
      })
      .end((err, res) => {
        const expectedResponse = {
          message: 'Incorrect password or email. Try again.'
        };
        expect(res.body).toEqual(expectedResponse);
        expect(res.status).toEqual(401);
        done();
      });
    });

    it('should log user in if details provided are valid', (done) => {
      request.post('/api/users/login')
      .send({
        email: 'taiwo.adedotun@andela.com',
        password: '123456'
      })
      .end((err, res) => {
        expect(res.body).toIncludeKey('token');
        expect(res.status).toEqual(200);
        done();
      });
    });
  });

  describe('POST: /api/users/logout', () => {
    it('should log user out', (done) => {
      request.post('/api/users/logout')
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
    });
  });
});
