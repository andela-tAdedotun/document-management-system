import models from '../models/';

const Role = models.Role;

export default {
  /**
  * @desc - Creates a new user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created role
  */
  createRole(req, res) {
    return Role
      .create({
        userRole: req.body.userRole
      })
      .then(role => res.send(role))
      .error(error => res.status(400).send(error));
  },

  /**
  * @desc - Gets all roles from the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created role
  */
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then((userRoles) => {
        if (!userRoles) {
          return res.send('You have not defined any userRole');
        }

        res.status(200).send(userRoles);
      });
  },

  /**
  * @desc - Creates a new user in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          res.send('No such role exists.');
        }
        return role.destroy()
          .then(() => res.status(200).send('Role successfully deleted.'))
          .catch(() => res.send('Could not delete role.'));
      });
  }
};
