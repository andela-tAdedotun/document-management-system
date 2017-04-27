module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          message: 'Please input a valid email address.'
        }
      }
    },
    privacy: {
      type: DataTypes.STRING,
      defaultValue: 'public'
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.hasMany(models.Document, {
          foreignKey: 'documentOwnerId'
        });

        User.belongsTo(models.Role, {
          foreignKey: 'RoleId',
          onDelete: 'CASCADE'
        });
      },
    },
  });
  return User;
};
