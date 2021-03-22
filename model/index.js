const {sequelize} = require('./connection');
const userModel = require('./user');
const productModel = require('./product');



userModel.hasMany(productModel, {foreignKey: 'userId'});
productModel.belongsTo(userModel, {foreignKey: 'userId'});


const connectToMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    connectToMySql,
    userModel,
    productModel
};


