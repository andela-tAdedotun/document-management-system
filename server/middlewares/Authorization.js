export default {
  /**
  * @desc - Checks if user trying to access endpoint is super admin
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @param {function} next - transfers to the next element in chain
  * @return {Promise} - none
  */
  isSuperAdmin: (req, res, next) => {
    if (req.user.roleId === 1) {
      next();
    } else {
      res.status(403).json({
        message: 'Only a super admin can do that.'
      });
    }
  }
};
