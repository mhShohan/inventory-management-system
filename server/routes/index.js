const router = require('express').Router();

router.use('/users', require('./userRoutes'));

module.exports = router;
