import express from 'express';
import userController from '../controllers/UserController';
import passport from '../middlewares/Authentication';
import authorization from '../middlewares/Authorization';

const userRouter = express.Router();

userRouter.route('/')
  .post(userController.createUser)
  .get(passport.authenticate(),
   authorization.isAdminOrSuperAdmin, userController.getUsers);

userRouter.route('/:id')
  .get(passport.authenticate(), userController.findUser)
  .put(passport.authenticate(), authorization.isAdminOrAuthorizedUser,
      userController.updateUser)
  .delete(passport.authenticate(),
    authorization.isSuperAdmin, userController.deleteUser);

userRouter.route('/:id/documents')
  .get(passport.authenticate(), userController.findUserDocuments);

userRouter.route('/login')
  .post(userController.logUserIn);

userRouter.route('/logout')
  .post(userController.logUserOut);

export default userRouter;
