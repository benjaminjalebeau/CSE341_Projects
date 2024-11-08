const router = require('express').Router();

router.get('/', (req, res) => {res.send("Is it working")});

module.exports = router;
