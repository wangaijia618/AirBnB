const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const { Spot, User, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models');

//get all of the current User's bookings
router.get('/current', requireAuth, async(req, res, next) => {
    let obj
    const {user} = req
    let result = []
    const allBooking = await Booking.findAll({
        where:{
            userId: user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        }
    })

    for(let j=0; j< allBooking.length; j++){
       obj = allBooking[j].toJSON()
        let imageUrl = await SpotImage.findByPk(
            allBooking[j].spotId ,{
                where: {preview: true},
            attributes: ['url']
        })
        obj.Spot.previewImage = imageUrl.url
    result.push(obj)

}
    res.json({ Bookings: result});
})

//Edit a Booking
router.put('/:bookingId', restoreUser, requireAuth, async (req, res, next) =>{
    const {startDate, endDate} = req.body
    const {bookingId} = req.params
    const {user} = req
   const editBooking = await Booking.findByPk(bookingId)

   if(!editBooking){
    res.statusCode = 404
    res.json({
        "message": "Booking couldn't be found",
        "statusCode": 404
    })
   }
   if(editBooking.userId !== user.id) {
    res.status(403)
    res.json({
        "message": "Booking must belong to the current user",
        "statusCode": 403
    })
   }
   if (endDate < startDate || !endDate || !startDate) {
    res.statusCode = 400
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
}
let today = new Date().toISOString().slice(0, 10)
// let today = new Date()
if (startDate < today || endDate < today || startDate > endDate) {
    res.statusCode = 403
        res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
}

let spotId = editBooking.spotId
const startDateConflict = await Booking.findAll({
   where:{
        [Op.and]: [
            {spotId: spotId },
            // {startDate: startDate },
                { [Op.or]: [{
                    startDate:{
                        [Op.between]: [startDate, endDate]
                    }
                }, {
                    endDate:{
                        [Op.between]: [startDate, endDate]
                    }
                   }]
                }
        ]
    },
})
// console.log('startDateConflict.length: ', startDateConflict.length)

if (startDateConflict.length > 1) {
    res.statusCode = 403
    res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
        }
    })
    // Booking must belong to the current user

}

if (user.id === editBooking.userId) {

    editBooking.set({
        startDate,
        endDate
    })

    await editBooking.save()

    return res.json(editBooking)

}
})

//Delete a Booking

router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const {bookingId} = req.params
    const {user} = req
    let today = new Date().toISOString().slice(0, 10)
    // let today = new Date()
    // console.log("==========", today)
    const deleteBooking = await Booking.findByPk(bookingId)
    if(!deleteBooking){
        res.statusCode = 404
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if(deleteBooking.startDate < today ||  deleteBooking.endDate < today){
        res.statusCode = 403
        res.json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })

} else if (deleteBooking.userId === user.id){

    await deleteBooking.destroy()

    res.statusCode = 200
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
} else {

    res.status(403)
         res.json( {
        "message": "Booking must belong to the current user or the Spot must belong to the current user",
        "statusCode": 403
    })
}

})

module.exports = router;


// const express = require('express');

// const { requireAuth } = require('../../utils/auth');
// const { Spot, Image, User, Review, Booking, sequelize } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors, verifyBookingSchedule, validateBookingInput } = require('../../utils/validation');

// const router = express.Router();

// const verifyBookingId = async (req, res, next) => {
//     let booking = await Booking.findByPk(req.params.id);
//     if (!booking) {
//         const err = new Error('Booking couldn\'t be found');
//         err.status = 404;
//         err.message = 'Booking couldn\'t be found';
//         err.title = 'Booking couldn\'t be found';
//         next(err);
//     }
//     next();
// };

// const pastBookings = async (req, res, next) => {
//     const booking = await Booking.findByPk(req.params.id, {
//         attributes: [
//             ['stDate', 'startDate'],
//             ['edDate', 'endDate'],
//         ]
//     });
//     if (Date.parse(booking.dataValues.endDate) < Date.parse(new Date().toUTCString())) {
//         const err = new Error('Past bookings can\'t be modified');
//         err.status = 400;
//         err.message = 'Past bookings can\'t be modified';
//         err.title = 'Past bookings can\'t be modified';
//         next(err);
//     }
//     next();
// };

// const verifyNonAllowedDeletingBookings = async (req, res, next) => {
//     const booking = await Booking.findByPk(req.params.id, {
//         attributes: [
//             ['stDate', 'startDate'],
//             ['edDate', 'endDate'],
//         ]
//     });
//     if (Date.parse(booking.dataValues.startDate) < Date.parse(new Date().toUTCString())) {
//         const err = new Error('Bookings that have been started can\'t be deleted');
//         err.status = 400;
//         err.message = 'Bookings that have been started can\'t be deleted';
//         err.title = 'Bookings that have been started can\'t be deleted';
//         next(err);
//     }
//     next();
// };

// const verifyBookingOwner = async (req, res, next) => {
//     const booking = await Booking.findByPk(req.params.id);
//     if (req.user.id != booking.userId) {
//         const err = new Error('Forbidden');
//         err.status = 403;
//         err.title = "Forbidden";
//         err.message = "Forbidden";
//         next(err);
//     }
//     next();
// };

// const verifyBookingAccessibility = async (req, res, next) => {
//     const booking = await Booking.findByPk(req.params.id);
//     const bookingSpot = await Spot.findByPk(booking.spotId);
//     if (req.user.id != booking.userId && bookingSpot.ownerId != req.user.id) {
//         const err = new Error('Forbidden');
//         err.status = 403;
//         err.title = "Forbidden";
//         err.message = "Forbidden";
//         next(err);
//     }
//     next();
// };

// router.put('/:id', requireAuth, verifyBookingId, verifyBookingOwner, pastBookings, validateBookingInput, verifyBookingSchedule, async (req, res, next) => {
//     try {
//         const bookingToUpdate = await Booking.findByPk(req.params.id);
//         const { startDate, endDate } = req.body;
//         await bookingToUpdate.update({
//             stDate: startDate,
//             edDate: endDate,
//         });
//         const { id, spotId, userId, stDate, edDate, createdAt, updatedAt } = bookingToUpdate
//         return res.json({
//             id,
//             spotId,
//             userId,
//             startDate: stDate,
//             endDate: edDate,
//             createdAt,
//             updatedAt
//         });
//     } catch (err) {
//         next(err);
//     }
// });

// router.delete('/:id', requireAuth, verifyBookingId, verifyBookingAccessibility, verifyNonAllowedDeletingBookings, async (req, res, next) => {
//     try {
//         const booking = await Booking.findByPk(req.params.id);
//         await booking.destroy();
//         return res.json({
//             message: 'Successfully deleted',
//             statusCode: res.statusCode,
//         });
//     } catch (err) {
//         next(err);
//     }
// });

// module.exports = router;
