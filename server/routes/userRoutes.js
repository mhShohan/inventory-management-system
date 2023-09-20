const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/', userController.registerUser);

module.exports = router;
