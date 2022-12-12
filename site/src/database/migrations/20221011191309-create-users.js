'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pass: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      contacto: {
        type: Sequelize.STRING
      },
      
      roles_id: {
        type: Sequelize.INTEGER,
        
          allowNull: false,
          references: {
            model: {
              tableName: 'roles'
            },
            key: 'id'
          }
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

/* avatars_id: {
        type: Sequelize.INTEGER
      }, */