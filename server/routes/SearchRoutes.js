const express = require('express');
const searchController = require('../controllers/SearchController');
const passport = require('../middlewares/authentication');

const searchRouter = express.Router();

searchRouter.route('/users/')
  .get(passport.authenticate(), searchController.searchUsers);

searchRouter.route('/documents/')
  .get(passport.authenticate(), searchController.searchDocuments);

module.exports = searchRouter;
