import bcrypt from 'bcrypt';
import logger from 'fm-log';

import model from '../../../server/models';
import DatabaseData from './DatabaseData';

const superAdminUser = DatabaseData.superAdminUser;
const superAdminUser2 = DatabaseData.superAdminUser2;
const adminUser = DatabaseData.adminUser;
const regularUser = DatabaseData.regularUser;
const regularUser2 = DatabaseData.regularUser2;
const regularUser3 = DatabaseData.regularUser3;
const adminUser2 = DatabaseData.adminUser2;
const adminUser3 = DatabaseData.adminUser3;

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the model
   * in order of associations
   * @return {Void} - Returns Void
   */
  static init() {
    logger.notice('Populating the Database....');
    model.sequelize.sync({
      force: true
    })
      .then(() => {
        SeedHelper.populateRoleTable()
          .then(() => {
            SeedHelper.populateUserTable()
              .then(() => {
                SeedHelper.populateDocumentTable()
                  .catch((err) => {
                    logger.error(err);
                  });
              })
              .catch((err) => {
                logger.error(err);
              });
          })
          .catch((err) => {
            logger.error(err);
          });
      })
      .catch((err) => {
        logger.error(err);
      });
  }

  /**
   * Populates model with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles =
      [DatabaseData.superAdmin, DatabaseData.admin, DatabaseData.regular];
    return model.Role.bulkCreate(roles);
  }

  /**
   * Define bycript to hash password
   * @param {String} password - User password
   * @returns {String} - Hashed password
   */
  static hashPass(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }

  /**
   * Populates model with default users
   * @returns {object} - A Promise object
   */
  static populateUserTable() {
    superAdminUser.password = SeedHelper.hashPass(superAdminUser.password);
    superAdminUser2.password = SeedHelper.hashPass(superAdminUser2.password);
    adminUser.password = SeedHelper.hashPass(adminUser.password);
    adminUser2.password = SeedHelper.hashPass(adminUser2.password);
    adminUser3.password = SeedHelper.hashPass(adminUser3.password);
    regularUser.password = SeedHelper.hashPass(regularUser.password);
    regularUser2.password = SeedHelper.hashPass(regularUser2.password);
    regularUser3.password = SeedHelper.hashPass(regularUser3.password);

    const users =
      [superAdminUser, superAdminUser2, adminUser, adminUser2, adminUser3,
        regularUser, regularUser2, regularUser3];
    return model.User.bulkCreate(users);
  }

  /**
   * Populates model with default documents
   * @returns {object} - A Promise object
   */
  static populateDocumentTable() {
    const documents = [
      DatabaseData.testDocument,
      DatabaseData.testDocument2,
      DatabaseData.testDocument3,
      DatabaseData.testDocument4,
      DatabaseData.testDocument5,
      DatabaseData.testDocument6,
      DatabaseData.testDocument7,
      DatabaseData.testDocument8,
      DatabaseData.testDocument9
    ];
    return model.Document.bulkCreate(documents);
  }
}

export default SeedHelper.init();
