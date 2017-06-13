module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      privacy: {
        type: Sequelize.STRING,
        defaultValue: 'public'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      roleId: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        onDelete: 'SET NULL',
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId'
        },
      },
    });
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Users')
};
