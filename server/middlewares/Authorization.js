export default {
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
