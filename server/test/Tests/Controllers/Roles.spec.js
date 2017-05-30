import supertest from 'supertest';
import chai from 'chai';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const expect = chai.expect;
const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;
const testRole = databaseData.testRole;

describe('The Role API', function () {
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

  describe('ROLES REQUESTS:', () => {
    describe('Role routes', () => {
      it('should not be accessible to regular users', (done) => {
        request.post('/api/roles')
        .set({ Authorization: regularUserToken })
        .send(testRole)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
      });

      it('should not be accessible to admins', (done) => {
        request.post('/api/roles')
          .set({ Authorization: adminToken })
          .send(testRole)
          .end((error, res) => {
            expect(res.status).to.equal(403);
            done();
          });
      });

      it('should not be accessible to unauthenticated users', (done) => {
        request.post('/api/roles')
          .send(testRole)
          .end((error, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });

    describe('POST: /api/roles', () => {
      it('should not create a role when required field is invalid', (done) => {
        const newRole = { newRole: 'Contributor' };
        request.post('/api/roles')
          .set({ Authorization: superAdminToken })
          .send(newRole)
          .end((error, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });

      it('should create role if field is valid and user is super admin',
      (done) => {
        request.post('/api/roles')
          .set({ Authorization: superAdminToken })
          .send(testRole)
          .end((error, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should throw an error for invalid data types', (done) => {
        request.post('/api/roles')
          .set({ Authorization: superAdminToken })
          .send({ userRole: {} })
          .end((error, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
    });

    describe('GET: /api/roles', () => {
      it('should get all roles if user is super admin', (done) => {
        request.get('/api/roles')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });

    describe('DELETE: /api/roles/:id', () => {
      it('should return 404 if role does not exist', (done) => {
        request.delete('/api/roles/24')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });

      it('should not delete the super admin role', (done) => {
        request.delete('/api/roles/1')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).to.equal(403);
            done();
          });
      });

      it('should delete role if role exists and not super admin', (done) => {
        request.delete('/api/roles/4')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
