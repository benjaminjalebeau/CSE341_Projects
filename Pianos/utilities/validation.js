const { body, validationResult } = require("express-validator");
const ObjectId = require('mongodb').ObjectId;

/*  **********************************
*  Customer Data Validation Rules
* ********************************* */
const customerValidationRules = () => {
  return [
    body("fName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A first name must be entered.'),

    body("lName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('A last name must be entered.'),
  
    body("address")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A street address must be entered.'),

    body("city")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A city must be entered.'),

    body("pianoModel")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A piano model must be entered.'),

    body("lastAppointment")
      .trim()
      .escape()
      .isDate().isISO8601()
      .optional({checkFalsy: true})
      .withMessage('Entered date must be this format: MM-DD-YYYY'),
      
    body("nextAppointment")
      .trim()
      .escape()
      .optional({checkFalsy: true})
      .isDate().isISO8601()
      .withMessage('Entered date must be this format: MM-DD-YYYY'),
  ]
}

/*  **********************************
*  RepairOrder Data Validation Rules
* ********************************* */
const repairOrderValidationRules = () => {
  return [
    body("customer_id")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A customer id must be entered')
      ,

    body("quote_cost")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .withMessage('Please enter a whole number')
      .isLength({ min: 1 })
      .withMessage('A cost as a whole number must be entered.'),
  
    body("actual_cost")
      .trim()
      .escape()
      .isNumeric()
      .withMessage('Please enter a whole number')
      .isLength({ min: 1 })
      .withMessage('A cost as a whole number must be entered.'),

    body("repair_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('A description must be entered.'),

    body("completed")
      .trim()
      .escape()
      .notEmpty()
      .isBoolean()
      .withMessage('true or false must be entered'),
  ]
}


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {customerValidationRules, validate, repairOrderValidationRules}