import jwt from 'jsonwebtoken';
import models from '../models/';
import pagination from '../helpers/PaginationHelper';
import config from '../config/config';

const User = models.User;
const Document = models.Document;

export default {
  /**
  * @desc - Creates a new user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created user
  */
  createUser(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(403).send('Email already exists. Use another.');
        }

        return User
          .create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            privacy: req.body.privacy,
            RoleId: req.body.roleId
          })
          .then((user) => {
            const payload = { id: user.id, roleId: user.RoleId };
            const token = jwt.sign(payload, config.secret);
            res.status(201).send({ token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                RoleId: user.RoleId,
                privacy: user.privacy
              },
            });
          })
          .catch(error => res.send(error));
      });
  },

  /**
  * @desc - Gets all users stored in database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Found users
  */
  getUsers(req, res) {
    const findQuery = {};
    findQuery.limit = req.query.limit > 0 ? req.query.limit : 15;
    findQuery.offset = req.query.offset > 0 ? req.query.offset : 0;
    findQuery.attributes = { exclude: ['password'] };

    return User
      .findAndCountAll(findQuery)
      .then((users) => {
        const paginationInfo = pagination(findQuery.limit,
        findQuery.offset, users.count);
        res.status(200).send({
          paginationInfo,
          users: users.rows,
        });
      })
      .error(error => res.send(error));
  },

  /**
  * @desc - Find a particular user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The user the database is queried for
  */
  findUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }

        res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * @desc - Find a particular user and their documents in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The user along with their documents
  */
  findUserDocuments(req, res) {
    // Default value for a super admin. Can access all documents.
    let where = {};

    /*
      Document access for admins.
      An admin can access all public documents, private and 'role' documents
      belonging to users with less privilege, and 'role' documents belonging
      to admins in addition to the admin's documents.
    */
    if (req.user.roleId === 2) {
      where = {
        $or: [
          { access: 'public' },
          { access: 'private',
            $not: {
              '$User.RoleId$': 1
            },
            $or: {
              '$User.id$': req.user.id,
              '$User.RoleId$': { $gt: 2 }
            }
          },
          { access: 'role',
            $not: {
              '$User.RoleId$': 1
            }
          },
        ]
      };
      /*
        Document access for regular users.
        Regular users can only access another user's documents if those
        documents are public or 'role'. They can access all their own
        documents
      */
    } else if (req.user.roleId > 2) {
      where = {
        $or: [
          { access: 'public' },
          { access: 'role',
            $and: {
              '$User.RoleId$': req.user.roleId
            }
          },
          { access: 'private',
            $and: {
              documentOwnerId: req.user.id
            }
          }
        ]
      };
    }

    return User
      .findById(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{
          model: Document,
          where
        }],
      })
      .then((userAndDocuments) => {
        if (!userAndDocuments) {
          return res.status(404).send('No documents yet.');
        }

        res.status(200).send(userAndDocuments);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * @desc - Update a particular user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - The updated user
  */
  updateUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found.');
        }

        if (req.user.roleId !== 1 && user.RoleId === 1) {
          return res.status(403).send('You are not authorized to do that.');
        } else if (req.user.roleId === 2) {
          if (user.RoleId === 2 && user.id !== req.user.id) {
            return res.status(403).send('You are not authorized to do that.');
          }
        } else if (req.user.roleId === 3) {
          if (req.user.id !== user.id) {
            return res.status(403).send('You are not authorized to do that.');
          }
        }

        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(400).send(error));
      })
      .catch(() => res.status(400).send('You are not authorized.'));
  },

  /**
  * @desc - Delete a particular user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  deleteUser(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }

        return user
          .destroy()
          .then(() => res.status(200).send('User successfully deleted.'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * @desc - Logs user in to application
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - containing user trying to log in
  */
  logUserIn(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.send('Please input your email and password');
    }

    const userEmail = req.body.email.toLowerCase();

    User.findOne({ where: { email: userEmail } })
      .then((user) => {
        if (!user) {
          res.status(401).send('No such user exists. Try again.');
        }

        if (user.isValidPassword(req.body.password)) {
          const payload = { id: user.id, roleId: user.RoleId };
          const token = jwt.sign(payload, config.secret);
          res.json({ message: 'Ok.', token });
        } else {
          res.status(401).send('Incorrect password or email. Try again.');
        }
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
  * @desc - Logs user out of application
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Void} - None
  */
  logUserOut(req, res) {
    req.logOut();
    res.json({ redirectTo: '/' });
  }
};
