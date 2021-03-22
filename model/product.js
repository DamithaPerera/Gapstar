const {DataTypes} = require('sequelize');
const {sequelize} = require('./connection');

const productModel = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    sku: {
        type: DataTypes.STRING
    },
    brand: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
    },
},{
    timestamps: false
});

module.exports = productModel;
