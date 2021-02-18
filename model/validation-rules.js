const { check,sanitizeBody } = require('express-validator');
module.exports = {
registerValidation : (req, res) => { 
    check('fristName').notEmpty().withMessage('Frist name is required.').isLength({ min: 6 }).withMessage('Must be at least 6 chars long').matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
    check('lastName').notEmpty().withMessage('Last name is required.').isLength({ min: 2 }).withMessage('Must be at least 2 chars long').matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),
    check('email').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email'),
    check('gender').notEmpty().withMessage('please select gender.'),
    check('dob').notEmpty().withMessage('Please provide date of birth.'),
    check('skills').notEmpty().withMessage('Please any one skill.'),
    check('password').trim().notEmpty().withMessage('Password required')
    .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
    .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
    .not().matches(/^$|\s+/).withMessage('White space not allowed'),
    check('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
            throw new Error('Password Confirmation does not match password');
       }
       return true;
      })
    }
}