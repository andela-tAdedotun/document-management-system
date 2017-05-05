import express from 'express';
import roleController from '../controllers/RoleController';
import passport from '../middlewares/Authentication';
import authorization from '../middlewares/Authorization';

const roleRouter = express.Router();

roleRouter.route('/')
  .get(passport.authenticate(),
   authorization.isSuperAdmin, roleController.getAllRoles)
  .post(passport.authenticate(),
   authorization.isSuperAdmin, roleController.createRole);

roleRouter.route('/:id')
  .delete(passport.authenticate(),
   authorization.isSuperAdmin, roleController.deleteRole);

export default roleRouter;
