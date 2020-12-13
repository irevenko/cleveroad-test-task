const router = require('express').Router();
const userController = require('./user.controller');
const testToken = require('../../middleware/auth');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/me', testToken, userController.getCurrentProfile);

module.exports = router;
