const { Sequelize } = require('sequelize');
const config = require('config');

const { name: dbName, host, user, password } = config.get('database');

const sequelize = new Sequelize(dbName, user, password, {
   host,
   dialect: 'mysql'
});

module.exports = {
   sequelize,
};
