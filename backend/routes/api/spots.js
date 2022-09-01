
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const router = express.Router();

const { Op } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');
//sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { create } = require('domain');


//middleware
const validateSpot = [
    check('page')
      .optional()
      .isInt({min:1})
      .withMessage("Page must be greater than or equal to 0"),
    check('size')
      .optional()
      .isInt({ min: 1})
      .withMessage("Size must be greater than or equal to 1"),
    check('minLat')
      .optional()
      .isDecimal()
      .withMessage("Minimum latitude is invalid"),
    check('maxLat')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
      check('minLng')
      .optional()
      .isDecimal()
      .withMessage("Maximum longitude is invalid"),
      check('maxLng')
      .optional()
      .isDecimal()
      .withMessage("Minimum longitude is invalid"),
      check('minPrice')
      .optional()
      .isInt({ min: 0})
      .withMessage( "Maximum price must be greater than or equal to 0"),
      check('maxPrice')
      .optional()
      .isInt({ min: 0})
      .withMessage( "Minimum price must be greater than or equal to 0"),
    handleValidationErrors
  ];
// Get all Spots
router.get('/', validateSpot, async (req, res, next) => {

    let {size, page} = req.query

    if(!page) page = 1
    if(!size) size = 20

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {}

    if(page >= 1 && size >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)

    }

    const allSpots = await Spot.findAll({
        ...pagination
    })
    let spot = []

    for(let el of allSpots){
        const allRating = await Review.findAll({
        where: {
            spotId: el.id
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"],
        ],
        raw: true,
        })

        let imageUrl = await SpotImage.findByPk(el.id, {where: { preview: true }, attributes: ['url'] })
    //           if(!imageUrl){
    //         data = {
    //             ...el.toJSON(), //...el.dataValues
    //             avgRating: allRating[0].avgRating,
    //             previewImage: null
    //         }

    //    } else {
        let data = el.toJSON()
        data.avgRating= allRating[0].avgRating
        data.previewImage = imageUrl.url
        //   data = {
        //     ...el.toJSON(),
        //     avgRating: allRating[0].avgRating,
        //     previewImage: imageUrl.url
        // }

        spot.push(data)
             }
            res.json({
        Spots: spot,
        page:page,
        size:size

    })
});
// const avgRatingObj = avgRating.toJSON();
//       const previewImageUrl = await SpotImage.findByPk(spotId, {
//         where: { preview: true },
//         attributes: ['url']
//       })
//       console.log(previewImageUrl)
//       avgRatingObj["prevewImage"] = previewImageUrl.url

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const{user} = req
    const allSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    let spot = []
    for(let el of allSpots){
        const allRating = await Review.findAll({
        where: {
            spotId: el.id
        },
        attributes: [
            [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
        ],
        raw: true,
        })

            data = {
                ...el.dataValues,
                avgRating: allRating[0].avgRating,
                // previewImage: imageUrl.url
            }
            spot.push(data)
    //    }
    }

    res.json({Spots:spot})
});

router.get('/:spotId', async (req, res, next) => {
    const {spotId} = req.params

    const spotById = await Spot.findByPk(spotId)
    if(!spotById){
       res.statusCode = 404,
       res.json({
           "message": "Spot couldn't be found",
           "statusCode": 404
         })
    }
   //  let image = await Image.findAll({
   //     attributes: [id, ['spotId', 'imageableId'], 'url'],
       // where:{soptId:spot}
   //  })
   //  let spot = []

   const numReviews = await Review.count({
       where: {
         spotId: spotId
       }
     })

       const allRating = await Review.findAll({
           where: {
               spotId
           },
           attributes: [
               [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
           ],
       })

       let imageUrl = await SpotImage.findOne(
           { where: { spotId },
           attributes: ['id','spotId', 'url']
       })

       let owner = await User.findByPk(spotById.ownerId, {
               attributes: ['id', 'firstName', 'lastName']
           })

   //    console.log(spotDetail)
//    let avgStarRating = allRating[0].dataValues.avgRating
//    console.log("avgStarRating: ", avgStarRating)
       data = {
           ...spotById.dataValues,
           numReviews,
           avgStarRating: allRating[0].dataValues.avgRating,
           Images: imageUrl,
           Owner: owner
       }

       // spot.push(data)


   res.json(data)
});

//Create a Spot
const spotValid = [
    check('address')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1 })
       .withMessage('Street address is required'),
    check('city')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1 })
       .withMessage('City is required'),
    check('state')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1 })
       .withMessage('State is required'),
    check('country')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1 })
       .withMessage('Country is required'),
    check('lat')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isFloat({min:-90, max:90})
       .withMessage('Latitude is not valid'),
    check('lng')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isFloat({min:-180, max:180})
       .withMessage('Longitude is not valid'),
    check('name')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1, max:50 })
       .withMessage('Name must be less than 50 characters'),
    check('description')
       .exists({ checkFalsy: true })
       .notEmpty()
       .isLength({ min: 1 })
       .withMessage('Description is required'),
    check('price')
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage('Price per day is required'),
    handleValidationErrors
    ]
router.post('/', spotValid, restoreUser, requireAuth, async(req, res, next) =>{
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const {user} = req
    const spots = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.statusCode = 201
    res.json(spots)
})

//Add an Image to a Spot based on th Spot based on the Spot's id
router.post('/:spotId/images', restoreUser, requireAuth, async(req, res, next) => {
    const {spotId} = req.params
    const{url, preview} = req.body
    const{user} = req

    const findSpotId = await Spot.findByPk(spotId)
    if(!findSpotId) {
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }else {
        const addImageToSpot = await SpotImage.create({
            "spotId": spotId,
            "url": url,
            preview
            //"userId": user.id
        })
        // SpotImage.save()
        res.json(await SpotImage.findByPk(addImageToSpot.id, {
            attributes: [
                'id',
                'url',
                'preview'
            ]
        }))
    }

})

//edit a Spot
router.put('/spotId', restoreUser, requireAuth, async(req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage} = req.body
    const {spotId} = req.params
    const spotedit = await Spot.findByPk(spotId)
    if(!spotedit) {
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    spotedit.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage
    })
    await spotedit.save()
    res.json(spotedit)
})

//delete a Spot
router.delete('/:spotId', async(req, res, next) => {
    const {spotId} = req.params
    const spotdelete = Spot.findByPk(spotId)
    if(!spotdelete) {
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    await spotdelete.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

//get all reviews by a Spot's id
router.get('/:spotId/reviews', async(req, res, next)=>{
    const {spotId} = req.params
    const spotReview = await Spot.findByPk(spotId)
    if(!spotReview){
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include:[
            {model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
        ]
      })
    //   for(let review of allReviews) {
        let reviewImage = await ReviewImage.findByPk(spotId, {attributes:['id','url'] })
        //  let data = allReviews.toJSON()
        // data.ReviewImages = reviewImage
    //    result.push(data)


    res.json({Reviews: allReviews , ReviewImages: reviewImage})
})
//create a review for a spot based on the spot's id
const reviewChecker = [
    check('review')
   .exists({ checkFalsy: true })
   .notEmpty()
   .withMessage('Review text is required'),
   check('stars')
   .exists({ checkFalsy: true })
   .notEmpty()
   .isInt({min:1, max: 5})
   .withMessage('Stars must be an integer from 1 to 5'),
   handleValidationErrors
]
router.post('/:spotId/reviews', reviewChecker, restoreUser, requireAuth, async(req, res, next) => {
    const {spotId} = req.params
    const{user} = req
    const{review, stars} = req.body
    const newReview = await Spot.findByPk(spotId)
    if(!newReview) {
        res.statusCode = 404
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const reviewConflict = await Review.findAll({
        where:{
            [Op.and]: [
                {userId: user.id}, {spotId: spotId}
            ]
        }
    })
    if(reviewConflict) {
        res.statusCode = 403
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }
     const createSpotReview = await Review.create({
        "userId": user.id,
        "spotId": spotId,
         review,
         stars
     })
     res.json(createSpotReview)
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const {spotId} = req.params
    const{user} = req
    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        res.statusCode = 404,
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    // console.log('this is spot.owner id', spot.ownerId)
    // console.log ('this is user id', user.id)

        if(spot.ownerId !== user.id){
            const notOwnerBooking = await Booking.findAll({

                attributes: ['spotId', "startDate", "endDate"],
                where: {
                    spotId: spotId
                }
            });
                res.json({Bookings: notOwnerBooking})

        } else if(spot.ownerId === user.id){
            const ownerBooking = await Booking.findAll({

                where: {
                    spotId: spotId
                },
                include:[{
                    model: User,
                    attributes: ['id','firstName', 'lastName'],

                    }
                ]

            });

                res.json({Bookings:ownerBooking})
        }

    })

    //create a booking from a spot based on the spot's id
    router.post('/:spotId/bookings', restoreUser, requireAuth, async(req, res, next) => {
        const {spotId} = req.params
        const{user} = req
        const{startDate, endDate} = req.body
        const findSpot = await Spot.findByPk(spotId)

        if(!findSpot) {
            res.statusCode = 404,
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
        }
        let today = new Date().toISOString().slice(0,10)
        if(endDate < startDate || startDate < today || endDate < today) {
            res.statusCode = 400,
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        }
        let bookingConflict = await Booking.findAll({
            where:{
                [Op.and]: [
                    {spotId: spotId},
                    {
                        startDate:{
                        [Op.between]: [startDate, endDate]
                    }
                    },
                    {
                        endDate: {
                        [Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        })

    if(bookingConflict) {
        res.statusCode = 403
        res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          })
        }else if(findSpot.ownerId !== user.id){
            const newBooking = await Booking.create({
                "spotId": spotId,
                "userId": user.id,
                startDate,
                endDate
            })
             res.json(newBooking)
        } else {
            res.statusCode = 403
            res.json({
                "message": "You can't booking your own Spot!!!",
                "statusCode": 403,
              })
        }

    })




module.exports = router;
