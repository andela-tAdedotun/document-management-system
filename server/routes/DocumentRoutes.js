import express from 'express';
import documentController from '../controllers/DocumentController';
import passport from '../middlewares/Authentication';
import authorization from '../middlewares/Authorization';

const documentRouter = express.Router();

documentRouter.route('/')
  .post(documentController.createDocument)
  .get(passport.authenticate(), documentController.getDocuments);

documentRouter.route('/:id')
  .get(passport.authenticate(), documentController.findDocument)
  .put(passport.authenticate(), authorization.isAdminOrAuthorizedUser,
      documentController.updateDocument)
  .delete(passport.authenticate(), documentController.deleteDocument);

export default documentRouter;
