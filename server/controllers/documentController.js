const Document = require('../models/').Document;
const pagination = require('../helpers/paginationHelper');

module.exports = {
  /**
  * @desc - Creates a new document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created document
  */
  createDocument(req, res) {
    return Document
      .create({
        title: req.body.title,
        content: req.body.content,
        protected: req.body.protected,
        access: req.body.access,
        documentOwnerId: req.body.ownerId
      })
      .then(document => res.status(201).send(document))
      .catch(error => res.send(error));
  },

  /**
  * @desc - Gets all documents stored in database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Found documents
  */
  getDocuments(req, res) {
    const findQuery = {};
    findQuery.limit = req.query.limit > 0 ? req.query.limit : 1;
    findQuery.offset = req.query.offset > 0 ? req.query.offset : 0;

    return Document
      .findAndCountAll(findQuery)
      .then((documents) => {
        const paginationInfo = pagination(findQuery.limit,
        findQuery.offset, documents.count);
        res.status(200).send({
          paginationInfo,
          documents: documents.rows,
        });
      })
      .error(error => res.send(error));
  },

  /**
  * @desc - Find a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The document the database is queried for
  */
  findDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        document.increment('views');

        if (!document) {
          return res.send('No such document exists.');
        }
        res.status(200).send(document);
      })
      .catch(error => res.send(error));
  },

  /**
  * @desc - Update a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The updated document
  */
  updateDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.send('No such document exists');
        }

        return document
          .update({
            title: req.body.title || document.title,
            content: req.body.content || document.content,
            protected: req.body.protected || document.protected,
            access: req.body.access || document.access,
          })
          .then(updatedDocument => res.status(200).send(updatedDocument))
          .catch(error => res.send(error));
      })
      .catch(error => res.send(error));
  },

  /**
  * @desc - Delete a particular document in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  deleteDocument(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.send('No such document exists');
        }

        return document
          .destroy()
          .then(() => res.status(200).send('Document deleted.'))
          .catch(() => res.send('Document could not be deleted'));
      })
      .catch(error => res.send(error));
  }
};
