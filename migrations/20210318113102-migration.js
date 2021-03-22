'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: Sequelize.STRING, allowNull: false},
            email: {type: Sequelize.STRING, unique: true, allowNull: false},
            password: {type: Sequelize.STRING, allowNull: false},
            accessToken: {type: Sequelize.STRING, allowNull: true}
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
