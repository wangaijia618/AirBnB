const router = require('express').Router();
// const bookingRouter = require('./bookings.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
// const reviewRouter = require('./reviews.js');
// const reviewImageRouter = require('./reviewImage.js');
// const spotImageRouter = require('./spotImage.js')
const { restoreUser } = require('../../utils/auth.js');

 router.use(restoreUser);

 router.use('/session', sessionRouter);

 router.use('/users', usersRouter);

 router.use('/spots', spotsRouter);

//  router.use('/bookings', bookingRouter);

//  router.use('/reviews', reviewRouter);

//  router.use('/reviewImage', reviewImageRouter);

//  router.use('/spotImage', spotImageRouter);


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });


 // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// GET /api/restore-user


// router.use(restoreUser);

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// ...

// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );



module.exports = router;
