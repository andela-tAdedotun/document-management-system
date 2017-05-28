import supertest from 'supertest';
import chai from 'chai';
import app from '../../../../server';
import databaseData from '../../TestHelpers/DatabaseData';

const expect = chai.expect;
const request = supertest.agent(app);
const superAdminUser = databaseData.superAdminUser;
const adminUser = databaseData.adminUser;
const regularUser = databaseData.regularUser;

describe('The search API', function () {
  this.timeout(15000);
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
        expect(res.status).to.equal(200);
        expect(res.body.users.length).to.equal(2);
        request.get('/api/search/users?q=taiwo')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users.length).to.equal(2);
          request.get('/api/search/users?q=taiwo')
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.users.length).to.equal(2);
            done();
          });
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
        expect(res.status).to.equal(200);
        expect(res.body.documents.length).to.equal(3);
        request.get('/api/search/documents?q=computing')
        .set({ Authorization: superAdminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(2);
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
        expect(res.status).to.equal(200);
        expect(res.body.documents.length).to.equal(0);
        request.get('/api/search/documents?q=baby')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(0);
          done();
        });
      });
    });

    it('should allow regular access have access to their documents, all ' +
     'public documents and role documents of regular users', (done) => {
      request.get('/api/search/documents?q=daddy')
      .set({ Authorization: regularUserToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents.length).to.equal(1);
        request.get('/api/search/documents?q=baby')
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.documents.length).to.equal(0);
          done();
        });
      });
    });
  });
});
