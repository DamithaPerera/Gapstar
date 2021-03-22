const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');
const bcrypt = require('bcrypt');

const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        set(password) {
            this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
        },
    },
    accessToken: {
        type: DataTypes.STRING
    },
},{
    timestamps: false,
});

module.exports = userModel;
