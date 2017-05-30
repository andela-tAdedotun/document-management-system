import supertest from 'supertest';
import chai from 'chai';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const expect = chai.expect;
const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;
const invalidUser = databaseData.invalidUser;
const validUser = databaseData.validUser;
const validUser2 = databaseData.validUser2;

describe('The User API', function () {
  this.timeout(4000);
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

  describe('POST: /api/users', () => {
    it('should not create a user if email already exists', (done) => {
      request.post('/api/users')
        .send(adminUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not create a user if any field is invalid', (done) => {
      request.post('/api/users')
        .send(invalidUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should create user if fields are valid and user does not exist',
     (done) => {
       request.post('/api/users')
        .send(validUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
     });

    it('should send user\'s jwt token and details as response',
      (done) => {
        request.post('/api/users')
         .send(validUser2)
         .end((err, res) => {
           expect(res.status).to.equal(201);
           expect(res.body.token).to.not.equal(undefined);
           done();
         });
      });
  });

  describe('GET: /api/users', () => {
    it('is accessible to all users', (done) => {
      request.get('/api/users')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          request.get('/api/users')
            .set({ Authorization: adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              request.get('/api/users')
                .set({ Authorization: regularUserToken })
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  done();
                });
            });
        });
    });

    it('should return an error if query is invalid',
      (done) => {
        request.post('/api/users?limit={}')
         .set({ Authorization: superAdminToken })
         .end((err, res) => {
           expect(res.status).to.equal(400);
           done();
         });
      });
  });

  describe('GET: /api/users/:id', () => {
    it('is accessible to all users', (done) => {
      request.get('/api/users/1')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          request.get('/api/users/2')
            .set({ Authorization: adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              request.get('/api/users/1')
                .set({ Authorization: regularUserToken })
                .end((err, res) => {
                  expect(res.status).to.equal(200);
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
           expect(res.status).to.equal(404);
           done();
         });
      });

    it('should return an error if id is not an integer',
      (done) => {
        request.get('/api/users/taiwo')
         .set({ Authorization: superAdminToken })
         .end((err, res) => {
           expect(res.status).to.equal(400);
           done();
         });
      });
  });

  describe('GET: /api/users/:id/documents', () => {
    it('should allow super admin access any user\'s documents', (done) => {
      request.get('/api/users/1/documents')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        request.get('/api/users/4/documents')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    it('should return an error if user id supplied does not exist',
      (done) => {
        request.get('/api/users/44/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           expect(res.status).to.equal(404);
           done();
         });
      });

    it('should return an error if user has no document',
      (done) => {
        request.get('/api/users/8/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           expect(res.status).to.equal(404);
           done();
         });
      });

    it('should return an error if id is invalid',
      (done) => {
        request.get('/api/users/taiwo/documents')
         .set({ Authorization: adminToken })
         .end((err, res) => {
           expect(res.status).to.equal(400);
           done();
         });
      });

    it('should only allow regular users access public documents of others,' +
    'role documents of other regular users and their own documents', (done) => {
      request.get('/api/users/1/documents')
       .set({ Authorization: regularUserToken })
       .end((err, res) => {
         expect(res.status).to.equal(404);
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
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should not be accessible to unauthenticated users', (done) => {
      request.put('/api/users/6')
      .send({ name: 'Taiwo' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should allow super admin to update any user', (done) => {
      request.put('/api/users/1')
      .send({ name: 'Kiniun' })
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        request.get('/api/users/1')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Kiniun');
          request.put('/api/users/2')
          .send({ email: 'ejanla@yahoo.com' })
          .set({ Authorization: superAdminToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            request.get('/api/users/2')
            .set({ Authorization: superAdminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.email).to.equal('ejanla@yahoo.com');
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
          expect(res.status).to.equal(403);
          request.put('/api/users/4')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(403);
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
          expect(res.status).to.equal(403);
          request.put('/api/users/4')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(403);
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
          expect(res.status).to.equal(403);
          request.put('/api/users/6')
          .send({ name: 'Ajanlekoko' })
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            request.put('/api/users/7')
            .send({ name: 'Ajanlekoko' })
            .set({ Authorization: regularUserToken })
            .end((err, res) => {
              expect(res.status).to.equal(403);
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
        expect(res.status).to.equal(403);
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
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should allow password update if old password supplied is correct',
    (done) => {
      request.put('/api/users/6')
      .send({
        password: 'Ajanlekoko',
        oldPassword: '123456'
      })
      .set({ Authorization: regularUserToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
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
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('DELETE: /api/users/:id', () => {
    it('is only accessible to a super admin', () => {
      request.delete('/api/users/2')
      .set({ Authorization: adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        request.delete('/api/users/6')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
      });
    });

    it('should return error if user does not exist', (done) => {
      request.delete('/api/users/22')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should return error if request is invalid',
    (done) => {
      request.delete('/api/users/kehinde')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should delete user if admin deletes a user that exists',
    (done) => {
      request.delete('/api/users/9')
      .set({ Authorization: superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
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
         expect(res.status).to.equal(400);
         request.post('/api/users/login')
         .send({
           password: 'adigun'
         })
         .end((err, res) => {
           expect(res.status).to.equal(400);
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
        expect(res.status).to.equal(401);
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
        expect(res.status).to.equal(401);
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
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('POST: /api/users/logout', () => {
    it('should log user out', (done) => {
      request.post('/api/users/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
