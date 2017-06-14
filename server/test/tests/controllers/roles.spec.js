import supertest from 'supertest';
import expect from 'expect';
import app from '../../../../server';
import Helpers from './Helpers';
import databaseData from '../../helpers/DatabaseData';

const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;
const testRole = databaseData.testRole;

describe('The Role API', () => {
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
          const expectedResponse =
            {
              message: 'Only a super admin can do that.'
            };
          expect(res.status).toEqual(403);
          expect(res.body).toEqual(expectedResponse);
          done();
        });
      });

      it('should not be accessible to admins', (done) => {
        request.post('/api/roles')
          .set({ Authorization: adminToken })
          .send(testRole)
          .end((error, res) => {
            const expectedResponse =
              {
                message: 'Only a super admin can do that.'
              };
            expect(res.body).toEqual(expectedResponse);
            expect(res.status).toEqual(403);
            done();
          });
      });

      it('should not be accessible to unauthenticated users', (done) => {
        request.post('/api/roles')
          .send(testRole)
          .end((error, res) => {
            expect(res.status).toEqual(401);
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
            expect(res.status).toEqual(400);
            done();
          });
      });

      it('should create role if field is valid and user is super admin',
      (done) => {
        request.post('/api/roles')
          .set({ Authorization: superAdminToken })
          .send(testRole)
          .end((error, res) => {
            const expectedResponse = {
              createdAt: res.body.createdAt,
              id: 4,
              updatedAt: res.body.updatedAt,
              userRole: 'Content Creator'
            };
            expect(res.body).toEqual(expectedResponse);
            expect(res.status).toEqual(201);
            done();
          });
      });

      it('should throw an error for invalid data types', (done) => {
        request.post('/api/roles')
          .set({ Authorization: superAdminToken })
          .send({ userRole: {} })
          .end((error, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });

    describe('GET: /api/roles', () => {
      it('should get all roles if user is super admin', (done) => {
        request.get('/api/roles')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            const expectedResponse = Helpers.getAllRoles(res);
            expect(res.body).toEqual(expectedResponse);
            expect(res.status).toEqual(200);
            done();
          });
      });
    });

    describe('DELETE: /api/roles/:id', () => {
      it('should return 404 if role does not exist', (done) => {
        request.delete('/api/roles/24')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });

      it('should not delete the super admin role', (done) => {
        request.delete('/api/roles/1')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            const expectedResponse = {
              message: 'You can\'t delete this role.'
            };
            expect(res.status).toEqual(403);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });

      it('should not delete the admin role', (done) => {
        request.delete('/api/roles/2')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            const expectedResponse = {
              message: 'You can\'t delete this role.'
            };
            expect(res.status).toEqual(403);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });

      it('should not delete the regular role', (done) => {
        request.delete('/api/roles/3')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            const expectedResponse = {
              message: 'You can\'t delete this role.'
            };
            expect(res.status).toEqual(403);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });

      it('should delete role if role is not super admin, admin or regular',
      (done) => {
        request.delete('/api/roles/4')
          .set({ Authorization: superAdminToken })
          .end((error, res) => {
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
  });
});
