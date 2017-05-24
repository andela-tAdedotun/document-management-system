import express from 'express';
import documentController from '../controllers/DocumentController';
import passport from '../middlewares/Authentication';

const documentRouter = express.Router();

documentRouter.route('/')
  .post(passport.authenticate(), documentController.createDocument)
  .get(passport.authenticate(), documentController.getDocuments);

documentRouter.route('/:id')
  .get(passport.authenticate(), documentController.findDocument)
  .put(passport.authenticate(), documentController.updateDocument)
  .delete(passport.authenticate(), documentController.deleteDocument);

export default documentRouter;
