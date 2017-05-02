const express = require('express');
const roleController = require('../controllers/RoleController');
const passport = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const roleRouter = express.Router();

roleRouter.route('/')
  .get(passport.authenticate(),
   authorization.isSuperAdmin, roleController.getAllRoles)
  .post(passport.authenticate(),
   authorization.isSuperAdmin, roleController.createRole);

roleRouter.route('/:id')
  .delete(passport.authenticate(),
   authorization.isSuperAdmin, roleController.deleteRole);

module.exports = roleRouter;
