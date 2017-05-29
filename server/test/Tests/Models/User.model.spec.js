import chai from 'chai';
import models from '../../../models';
import databaseData from '../../TestHelpers/DatabaseData';

const expect = chai.expect;
const User = models.User;
const noNameUser = databaseData.noNameUser;
const invalidUser = databaseData.invalidUser;
const noPasswordUser = databaseData.noPasswordUser;
const userHasUpperCaseEmail = databaseData.userHasUpperCaseEmail;
const tooShortPasswordUser = databaseData.tooShortPasswordUser;
const tooLongPasswordUser = databaseData.tooLongPasswordUser;
const superAdminUser = databaseData.superAdminUser;

describe('The User model', function () {
  this.timeout(10000);
  describe('With invalid user details', () => {
    it('should not create user if name is not supplied', (done) => {
      User.create(noNameUser)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: name cannot be null');
        });
      done();
    });

    it('should not create user if email is not supplied', (done) => {
      User.create(invalidUser)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: email cannot be null');
        });
      done();
    });

    it('should not create user if password is not supplied', (done) => {
      User.create(noPasswordUser)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: password cannot be null');
        });
      done();
    });

    it('should not create if password length less than 6 or greater than 15',
     (done) => {
       User.create(tooShortPasswordUser)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('Validation error: Validation len failed');
          User.create(tooLongPasswordUser)
           .catch((err) => {
             expect(err.name).to.equal('SequelizeValidationError');
             expect(err.message)
               .to.equal('Validation error: Validation len failed');
           });
          done();
        });
     });
  });

  describe('With valid user details', () => {
    it('should lower case email before saving it', (done) => {
      User.create(userHasUpperCaseEmail)
        .then((user) => {
          expect(user.email).to.not.equal(userHasUpperCaseEmail.email);
          expect(user.email)
            .to.equal(userHasUpperCaseEmail.email.toLowerCase());
          done();
        });
    });
  });
});
