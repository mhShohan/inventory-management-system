const router = require('express').Router();
const userController = require('../controller/userController');
const { verifyAuth } = require('../middleware/athhMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/', verifyAuth, userController.getSingleUser);
router.get('/verifyLoggedIn', userController.verifyLoggedIn);
router.patch('/update', verifyAuth, userController.updateUser);

module.exports = router;
