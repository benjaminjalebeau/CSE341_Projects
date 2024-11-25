const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Is it working")
});

router.use('/customers', require('./customers'));

router.use('/repairOrder', require('./repairOrder'));

module.exports = router;
