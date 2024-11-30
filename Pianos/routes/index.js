const router = require('express').Router();

const passport = require('passport');


router.use('/', require('./swagger'));

/*router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Is it working")
});*/

router.use('/customers', require('./customers'));

router.use('/repairOrder', require('./repairOrder'));

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', function(req, res, next ) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
