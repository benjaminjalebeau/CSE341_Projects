const router = require('express').Router();
const {repairOrderValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const repairOrderController = require('../controllers/repairOrder.js');
const { isAuthenticated } = require("../utilities/authenticate.js")

router.get('/', repairOrderController.getAllRepairOrders);

router.get('/:id', repairOrderController.getRepairOrder);

router.post('/', 
    isAuthenticated,
    repairOrderValidationRules(),
    validate,
    repairOrderController.addRepairOrder);

router.put('/:id',
    isAuthenticated,
    repairOrderValidationRules(),
    validate,
    repairOrderController.updateRepairOrder);

router.delete('/:id', isAuthenticated, repairOrderController.deleteRepairOrder);

module.exports = router;
