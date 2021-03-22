const router = require('express').Router();
const userController = require('./user.controller');
const validation = require('./user.validation');


router.post('/registration', validation.register, userController.registerUserController);

router.post('/login', validation.login, userController.loginUserController);


module.exports = router;
