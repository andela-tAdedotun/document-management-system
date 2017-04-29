const express = require('express');
const roleController = require('../controllers/roleController');

const roleRouter = express.Router();

roleRouter.route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole)

roleRouter.route('/:id')
  .delete(roleController.deleteRole);

module.exports = roleRouter;
