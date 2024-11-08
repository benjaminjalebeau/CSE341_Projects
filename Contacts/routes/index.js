const router = require('express').Router();

router.get('/', (req, res) => {res.send("Is it working")});

router.use('/users', require('./users'));

module.exports = router;
