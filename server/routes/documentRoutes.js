const express = require('express');
const documentController = require('../controllers/documentController');

const documentRouter = express.Router();

documentRouter.route('/')
  .post(documentController.createDocument)
  .get(documentController.getDocuments);

documentRouter.route('/:id')
  .get(documentController.findDocument)
  .put(documentController.updateDocument)
  .delete(documentController.deleteDocument);

module.exports = documentRouter;
