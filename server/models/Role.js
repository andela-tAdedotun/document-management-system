export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    userRole: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      },
    },
  });
  return Role;
};
