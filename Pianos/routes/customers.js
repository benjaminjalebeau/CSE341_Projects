const router = require('express').Router();
const {customerValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const customersController = require('../controllers/customers.js');
const { isAuthenticated } = require("../utilities/authenticate.js")


router.get('/', customersController.getAllCustomers);

router.get('/:id', customersController.getCustomer);

router.post(
    '/',
    isAuthenticated,
    customerValidationRules(), 
    validate, 
    customersController.addCustomer
    
);

router.put(
    '/:id',
    isAuthenticated,
    customerValidationRules(), 
    validate, 
    customersController.updateCustomer
);

router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;