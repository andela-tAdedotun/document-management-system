const express = require('express');
const documentController = require('../controllers/DocumentController');
const passport = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const documentRouter = express.Router();

documentRouter.route('/')
  .post(documentController.createDocument)
  .get(passport.authenticate(), documentController.getDocuments);

documentRouter.route('/:id')
  .get(passport.authenticate(), documentController.findDocument)
  .put(passport.authenticate(), authorization.isAdminOrAuthorizedUser,
      documentController.updateDocument)
  .delete(passport.authenticate(), documentController.deleteDocument);

module.exports = documentRouter;
