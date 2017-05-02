// const jwt = require('jsonwebtoken');
// const config = require('../config/config.js');

module.exports = {
  isAdminOrSuperAdmin: (req, res, next) => {
    if (req.user.roleId === 1 || req.user.roleId === 2) {
      next();
    } else {
      res.status(403).send('Accessible only to an admin or super admin.');
    }
  },

  isAdminOrAuthorizedUser: (req, res, next) => {
    if (req.user.roleId === 1 || req.user.roleId === 2
      || Number(req.params.id) === req.user.id) {
      next();
    } else {
      res.status(403).send('You are not authorized to perform action.');
    }
  },

  isSuperAdmin: (req, res, next) => {
    if (req.user.roleId === 1) {
      next();
    } else {
      res.status(403).send('Only a super admin can do that.');
    }
  }
};
