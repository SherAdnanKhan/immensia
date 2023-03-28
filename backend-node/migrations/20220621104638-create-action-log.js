'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActionLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      employee_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      employee_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: true
      }, 
      app_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      app_role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      action: {
        type: Sequelize.STRING,
        allowNull: true
      },
      data_request: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      data_response: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      request_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      request_message: {
        type: Sequelize.STRING,
        allowNull: true
      }, 
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"users",
          key:"id"
        },
        allowNull: false
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
    await queryInterface.dropTable('ActionLogs');
  }
};