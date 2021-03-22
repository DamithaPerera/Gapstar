const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const expressGraphQL = require('express-graphql').graphqlHTTP
// const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const { ApolloServer, gql } = require('apollo-server');


const authentication = require('./lib/middleware');
const {connectToMySql} = require('./model/index');

const user = require('./module/user/user.router');
const product = require('./module/product/product.router');


(async () => {
    await connectToMySql();
})();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// Authenticate all requests
app.use((req, res, next) => {
    authentication.authentication(req, res, next);
});


app.use('/v1/user', user)
app.use('/v1/product', product)


module.exports = app;
