const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors
];
// "credential": "Email or username is required",
// "password": "Password is required"
// Log in
router.post(
    '/',
    validateLogin,   //this line added after creating middleware above
    async (req, res, next) => {
      const { credential, password } = req.body;
      const user = await User.login({ credential, password });
      if (!user) {
        const err = new Error();
        err.status = 401;
        // err.title = 'Login failed';
        err.errors = ["Invalid credentials"];
        return next(err);
        res.status(401)
        return res.json(
          {
            "message": "Invalid credentials",
            "statusCode": 401
          }
        )
      }

      let token = await setTokenCookie(res, user);
      const userData = user.toSafeObject()
      userData.token = token
      return res.json(
        userData
      );
    }
  );

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
      //  } else res.json({});
    }
  );


module.exports = router;
