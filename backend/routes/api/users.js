const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { nextTick } = require('process');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const sameEmail = await User.findOne({
      where: { email },
    })

  if(sameEmail){
      res.statusCode = 403
      res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
  }

  const sameUsername = await User.findOne({
      where: { username },
    })

  if(sameUsername){
      res.statusCode = 403
      res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
  }
      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);
      const userData = user.toSafeObject()
      userData.token = token
      return res.json(
        userData
      );
    }
  );

  // {
//   "credential": "john.smith@gmail.com",
//   "password": "secret password"
// }
module.exports = router;
