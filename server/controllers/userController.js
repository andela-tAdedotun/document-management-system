const User = require('../models/').User;
const Document = require('../models/').Document;
const pagination = require('../helpers/paginationHelper');

module.exports = {
  /**
  * @desc - Creates a new user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created user
  */
  createUser(req, res) {
    return User
      .create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        privacy: req.body.privacy,
        RoleId: req.body.roleId
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.send(error));
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
    return User
      .findById(req.params.id, {
        include: [Document],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }

        res.status(200).send(user);
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
          return res.status(404).send('User not found');
        }

        return user
          .update({
            name: req.body.name || user.name,
            password: req.body.password || user.password,
            email: req.body.email || user.email,
            privacy: req.body.privacy || user.privacy,
            RoleId: req.body.RoleId || user.RoleId,
          })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
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
};
