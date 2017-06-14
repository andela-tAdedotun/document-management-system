import models from '../models/';

const Role = models.Role;


/**
 *
 */
class RoleController {
  /**
  * @desc - Creates a new user in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created role
  */
  static createRole(req, res) {
    if (!req.body.userRole) {
      return res.status(400).json({
        message: 'Request should have userRole in body'
      });
    }
    return Role
      .create({
        userRole: req.body.userRole
      })
      .then(role => res.status(201).json(role))
      .catch(error => res.status(400).json(error));
  }

  /**
  * @desc - Gets all roles from the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - Created role
  */
  static getAllRoles(req, res) {
    return Role
      .findAll()
      .then((userRoles) => {
        res.status(200).json(userRoles);
      })
      .catch(error => res.status(400).json({
        message: error.message
      }));
  }

  /**
  * @desc - Creates a new role in the database
  *
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @return {Promise} - -
  */
  static deleteRole(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).json({
            message: 'No such role exists.'
          });
        }

        if (role.id === 1 || role.id === 2 || role.id === 3) {
          return res.status(403).json({
            message: 'You can\'t delete this role.'
          });
        }
        return role.destroy()
          .then(() => res.status(200).json({
            message: 'Role successfully deleted.'
          }))
          .catch(error => res.status(400).json({
            message: error.message
          }));
      });
  }
}

export default RoleController;
