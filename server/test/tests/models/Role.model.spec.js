import chai from 'chai';
import models from '../../../models';
import databaseData from '../../helpers/DatabaseData';

const admin = databaseData.admin;

const expect = chai.expect;
const Role = models.Role;

describe('The Role model', () => {
  describe('When supplied with invalid roles', () => {
    it('does not create duplicate roles', (done) => {
      Role.create(admin)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeUniqueConstraintError');
        });
      done();
    });
  });
});
