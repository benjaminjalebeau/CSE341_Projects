const router = require('express').Router();
const {customerValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const customersController = require('../controllers/customers.js');


router.get('/', customersController.getAllCustomers);

router.get('/:id', customersController.getCustomer);

router.post(
    '/',
    customerValidationRules(), 
    validate, 
    customersController.addCustomer
    
);

router.put(
    '/:id',
    customerValidationRules(), 
    validate, 
    customersController.updateCustomer
);

router.delete('/:id', customersController.deleteCustomer);

module.exports = router;