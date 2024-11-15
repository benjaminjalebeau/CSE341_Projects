const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Is it working")
});

router.use('/users', require('./users'));

module.exports = router;
