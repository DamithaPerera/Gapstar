'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            name: {type: Sequelize.STRING, allowNull: false},
            slug: {type: Sequelize.STRING, allowNull: false},
            sku: {type: Sequelize.STRING, allowNull: false, unique: true},
            brand: {type: Sequelize.STRING, allowNull: false},
            userId: {
                type: Sequelize.INTEGER, allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};
