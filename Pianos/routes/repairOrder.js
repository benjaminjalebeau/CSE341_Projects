const router = require('express').Router();
const {repairOrderValidationRules, validate} = require('../utilities/validation.js');
const util = require("../utilities/index.js")
const repairOrderController = require('../controllers/repairOrder.js');

router.get('/', repairOrderController.getAllRepairOrders);

router.get('/:id', repairOrderController.getRepairOrder);

router.post('/', 
    repairOrderValidationRules(),
    validate,
    repairOrderController.addRepairOrder);

router.put('/:id',
    repairOrderValidationRules(),
    validate,
    repairOrderController.updateRepairOrder);

router.delete('/:id', repairOrderController.deleteRepairOrder);

module.exports = router;
