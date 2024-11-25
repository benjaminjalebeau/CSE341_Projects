const router = require('express').Router();
const {customerValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const customersController = require('../controllers/customers.js');


router.get('/', util.handleErrors(customersController.getAllCustomers));

router.get('/:id', util.handleErrors(customersController.getCustomer));

router.post(
    '/',
    customerValidationRules(), 
    validate, 
    util.handleErrors(customersController.addCustomer)
    
);

router.put(
    '/:id',
    customerValidationRules(), 
    validate, 
    util.handleErrors(customersController.updateCustomer)
    
);

router.delete('/:id', util.handleErrors(customersController.deleteCustomer));

module.exports = router;