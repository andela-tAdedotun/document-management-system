// const jwtDecode = require('jsonwebtoken');
// const config = require('../config/config.js');

export default {
  isSuperAdmin: (req, res, next) => {
    if (req.user.roleId === 1) {
      next();
    } else {
      res.status(403).send('Only a super admin can do that.');
    }
  }
};
