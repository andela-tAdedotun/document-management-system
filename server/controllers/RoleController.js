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
    if (!req.body.userRole) {
      return res.status(400).send('Request should have userRole in body');
    }
    return Role
      .create({
        userRole: req.body.userRole
      })
      .then(role => res.send(role))
      .catch(error => res.status(400).send(error));
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
        res.status(200).send(userRoles);
      })
      .catch(error => res.status(400).send(error.message));
  },

  /**
  * @desc - Creates a new role in the database
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          res.status(404).send('No such role exists.');
        }

        if (role.id === 1) {
          return res.status(403).send('You can\'t delete this role.');
        }
        return role.destroy()
          .then(() => res.status(200).send('Role successfully deleted.'))
          .catch(error => res.status(400).send(error.message));
      });
  }
};
