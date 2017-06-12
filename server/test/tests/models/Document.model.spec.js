import chai from 'chai';
import models from '../../../models';
import databaseData from '../../helpers/DatabaseData';

const expect = chai.expect;
const Document = models.Document;
const noTitleDocument = databaseData.noTitleDocument;
const noContentDocument = databaseData.noContentDocument;
const noAccessDocument = databaseData.noAccessDocument;
const noOwnerDocument = databaseData.noOwnerDocument;
const validDocument = databaseData.validDocument;

describe('The Documents model', () => {
  describe('With invalid documents', () => {
    it('should throw error if title is empty', (done) => {
      Document.create(noTitleDocument)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: title cannot be null');
        });
      done();
    });

    it('should throw error if content is empty', (done) => {
      Document.create(noContentDocument)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: content cannot be null');
        });
      done();
    });

    it('should throw error if access is not specified', (done) => {
      Document.create(noAccessDocument)
        .catch((error) => {
          expect(error.name).to.equal('SequelizeValidationError');
          expect(error.message)
            .to.equal('notNull Violation: access cannot be null');
        });
      done();
    });

    it('should not create document if user does not exist', (done) => {
      Document.create(noOwnerDocument)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeForeignKeyConstraintError');
      });
      done();
    });
  });

  describe('With valid documents', () => {
    it('should create document if all fields exist and are valid', (done) => {
      Document.create(validDocument)
      .then((document) => {
        expect(document.title).to.equal(validDocument.title);
      });
      done();
    });
  });
});
