import express from 'express';
import searchController from '../controllers/SearchController';
import passport from '../middlewares/Authentication';

const searchRouter = express.Router();

searchRouter.route('/users/')
  .get(passport.authenticate(), searchController.searchUsers);

searchRouter.route('/documents/')
  .get(passport.authenticate(), searchController.searchDocuments);

export default searchRouter;
