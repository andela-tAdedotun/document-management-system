/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
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

    instanceMethods: {
      /**
      * @desc - Hashes password before it is saved into the database
      * @return {Void} - None
      */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
      },

      /**
      * @desc - Checks if password provided by user is the same as the one
        stored for the user in the database
      * @param {String} password - Password user is trying to log in with
      * @return {Boolean} - Truthy of falsy depending on whether password
        is valid or not
      */
      isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },

    hooks: {
      /**
      * @desc - Performs actions on user before creation
      * @param {Object} user - object representing user to be created
      * @return {Void} - None
      */
      beforeCreate: (user) => {
        user.email = user.email.toLowerCase();
        user.hashPassword();
      },

      /**
      * @desc - Performs actions on user before it is updated
      * @param {Object} updateDetails - object representing details to update
        user with
      * @return {Void} - None
      */
      beforeUpdate: (updateDetails) => {
        if (updateDetails._changed.email) {
          updateDetails.email = updateDetails.email.toLowerCase();
        }

        if (updateDetails._changed.password) {
          updateDetails.hashPassword();
        }
      }
    }
  });
  return User;
};
