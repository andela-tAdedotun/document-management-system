const express = require('express');
const searchController = require('../controllers/searchController');

const searchRouter = express.Router();

searchRouter.route('/users/')
  .get(searchController.searchUsers);

searchRouter.route('/documents/')
  .get(searchController.searchDocuments);

module.exports = searchRouter;
