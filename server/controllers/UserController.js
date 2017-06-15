import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/';
import pagination from '../helpers/PaginationHelper';

const User = models.User;
const Document = models.Document;

dotenv.config();
const secret = process.env.SECRET;
/**
 *
 */
class UserController {
  /**
  * @desc - Creates a new user in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created user
  */
  static createUser(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({
            message: 'Email already exists. Use another.'
          });
        }

        if ((!req.user || req.user.roleId !== 1) && req.body.roleId) {
          return res.status(403).json({
            message: 'You are not allowed to do post role id.'
          });
        }

        return User
          .create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            privacy: req.body.privacy,
            roleId: req.body.roleId
          })
          .then((user) => {
            const payload = {
              id: user.id,
              roleId: user.roleId,
              name: user.name,
              email: user.email
            };
            const token = jwt.sign(payload, secret);
            res.status(201).json({ token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId
              },
            });
          })
          .catch(() => res.status(400).json({
            message: 'Invalid signup parameters.'
          }));
      });
  }

  /**
  * @desc - Gets all users stored in database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Found users
  */
  static getUsers(req, res) {
    const findQuery = {};
    findQuery.limit = req.query.limit > 0 ? req.query.limit : 15;
    findQuery.offset = req.query.offset > 0 ? req.query.offset : 0;
    findQuery.attributes = { exclude: ['password'] };
    findQuery.order = [['roleId', 'DESC']];

    return User
      .findAndCountAll(findQuery)
      .then((users) => {
        const paginationInfo = pagination(findQuery.limit,
        findQuery.offset, users.count);
        res.status(200).json({
          paginationInfo,
          users: users.rows,
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Find a particular user in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The user the database is queried for
  */
  static findUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }

        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Find a particular user and their documents in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The user along with their documents
  */
  static findUserDocuments(req, res) {
    // Default value for a super admin. Can access all documents.
    const queryOptions = {};
    queryOptions.where = { documentOwnerId: req.params.id };
    queryOptions.limit = req.query.limit > 0 ? req.query.limit : 12;
    queryOptions.offset = req.query.offset > 0 ? req.query.offset : 0;

    // Document access for admins.
    if (req.user.roleId === 2) {
      queryOptions.where = {
        documentOwnerId: req.params.id,
        $and: {
          $or: [
            { access: 'public' },
            { access: 'private',
              $not: {
                '$User.roleId$': 1
              },
              $or: {
                '$User.id$': req.user.id,
                '$User.roleId$': { $gt: 2 }
              }
            },
            { access: 'role',
              $not: {
                '$User.roleId$': 1
              }
            },
          ]
        }
      };

      queryOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'roleId'] }
        }
      ];
      // Document access for regular users.
    } else if (req.user.roleId > 2) {
      queryOptions.where = {
        documentOwnerId: req.params.id,
        $and: {
          $or: [
            { access: 'public' },
            { access: 'role',
              $and: {
                '$User.roleId$': req.user.roleId
              }
            },
            { access: 'private',
              $and: {
                documentOwnerId: req.user.id
              }
            }
          ]
        }
      };

      queryOptions.include = [
        {
          model: User,
          attributes: { exclude: ['password', 'privacy', 'roleId'] }
        }
      ];
    }

    return Document
      .findAndCountAll(queryOptions)
      .then((documents) => {
        if (documents.rows.length === 0) {
          return res.status(404).json({
            message: 'No documents yet.'
          });
        }
        const paginationInfo = pagination(queryOptions.limit,
        queryOptions.offset, documents.count);
        res.status(200).json({
          documents: documents.rows,
          paginationInfo
        });
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Update a particular user in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The updated user
  */
  static updateUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (req.body.email !== user.email) {
          User.findOne({ where: { email: req.body.email } })
          .then((existingUser) => {
            if (existingUser) {
              return res.status(403).json({
                message: 'Email already exists. Use another.'
              });
            }
          });
        }

        if (!user) {
          return res.status(404).json({
            message: 'User not found.'
          });
        }

        if (req.user.roleId !== 1 && req.body.roleId) {
          return res.status(403).json({
            message: 'You are not authorized to do that.'
          });
        }

        if (req.user.roleId !== 1) {
          if (user.id !== req.user.id) {
            return res.status(403).json({
              message: 'You are not authorized to do that.'
            });
          }
        }

        if (req.body.password) {
          if (!req.body.oldPassword) {
            return res.status(403).json({
              message: 'You must provide old password'
            });
          }

          if (user.isValidPassword(req.body.oldPassword)) {
            delete req.body.oldPassword;
          } else {
            return res.status(403).json({
              type: 'Invalid password',
              message: 'Incorrect old password. Try again.'
            });
          }
        }

        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            roleId: updatedUser.roleId,
          }))
          .catch(error => res.status(400).json({
            message: error.message
          }));
      })
      .catch(() => res.status(400).json({
        message:
      'You have sent a bad request. User with that id probably does not exist.'
      }));
  }

  /**
  * @desc - Delete a particular user in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  static deleteUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }

        if (user.roleId === 1) {
          return res.status(403).json({
            message: 'This app needs a super admin. ' +
            'You cannot perform this operation.'
          });
        }

        return user
          .destroy()
          .then(() => res.status(200).json({
            message: 'User successfully deleted.'
          }))
          .catch(error => res.status(400).json({
            message: error.message
          }));
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Logs user in to application
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - containing user trying to log in
  */
  static logUserIn(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Please input your email and password'
      });
    }

    const userEmail = req.body.email.toLowerCase();

    User.findOne({ where: { email: userEmail } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'No user with that email exists.'
          });
        }

        if (user.isValidPassword(req.body.password)) {
          const payload = {
            id: user.id,
            roleId: user.roleId,
            name: user.name,
            email: user.email
          };
          const token = jwt.sign(payload, secret);
          res.status(200).json({ token });
        } else {
          res.status(401).json({
            message: 'Incorrect password or email. Try again.'
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message
        });
      });
  }

  /**
  * @desc - Logs user out of application
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Void} - None
  */
  static logUserOut(req, res) {
    req.logOut();
    res.status(200).json({ redirectTo: '/' });
  }
}

export default UserController;
