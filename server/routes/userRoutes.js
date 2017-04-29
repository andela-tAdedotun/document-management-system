const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.route('/')
  .post(userController.createUser)
  .get(userController.getUsers);

userRouter.route('/:id')
  .get(userController.findUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route('/:id/documents')
  .get(userController.findUserDocuments);

userRouter.route('/login')
  .post();

userRouter.route('/logout')
  .post();

module.exports = userRouter;
