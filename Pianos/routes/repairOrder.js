const router = require('express').Router();
const {repairOrderValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const repairOrderController = require('../controllers/repairOrder.js');

router.get('/', util.handleErrors(repairOrderController.getAllRepairOrders));

router.get('/:id', util.handleErrors(repairOrderController.getRepairOrder));

router.post('/', 
    repairOrderValidationRules(),
    validate,
    util.handleErrors(repairOrderController.addRepairOrder));

router.put('/:id',
    repairOrderValidationRules(),
    validate,
    util.handleErrors(repairOrderController.updateRepairOrder));

router.delete('/:id', util.handleErrors(repairOrderController.deleteRepairOrder));

module.exports = router;