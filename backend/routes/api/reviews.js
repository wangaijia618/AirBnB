
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const router = express.Router();

const { Op } = require('sequelize');
const { User, Spot, Booking, SpotImage, Review, ReviewImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { create } = require('domain');
const { isReadable } = require('stream');

//get all review from current user
router.get('/current', requireAuth, async(req, res, next) => {
    const {user} = req
    // let spotimage = await SpotImage.findAll({
    //     spotId: user.id.spotId,
    //     include:[{
    //         model: Spot,

    //     }]
    // })
    let result = []
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description','createdAt', 'updatedAt']
                    // {'previewImage': spotimage.url}
                }
            },
            {
                model: ReviewImage,
                attributes: ['id','url']
            }
          ]

        })

     for(let review of reviews) {
        let spotimage = await SpotImage.findByPk( review.id, {where: { preview: true }, attributes: ['url'] })

        let data = review.toJSON()
        data.Spot.previewImage = spotimage?.url
       result.push(data)
    }
       return res.json({Reviews: result})
    })

//create an image to a review based on the review's id
router.post('/:reviewId/images', restoreUser, requireAuth, async(req, res, next) => {
    const {reviewId} = req.params
    const{user} = req
    const{url, previewImage} = req.body
    const findReview = await Review.findByPk(reviewId)
    if(!findReview) {
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if(user.id !== findReview.userId) {
        res.status(403)
        res.json({

            "message": "You must be the current user.",
            "statusCode": 403
        })
    } else {
        const imagecount = await ReviewImage.count({where: {reviewId}})
        if(imagecount > 10){
            res.statusCode = 403
            res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            })
        }
        const newImage = await ReviewImage.create({
            "reviewId": reviewId,
            "url": url
        })

        res.json(await ReviewImage.findByPk(newImage.id, {
            attributes: [
                'id',
                'url'
            ]
        }))
    }

})

//Edit a review
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
router.put('/:reviewId', reviewChecker, restoreUser, requireAuth, async(req, res, next) => {
    const {review, stars} = req.body
    const{reviewId} = req.params
    const {user} = req

    const reviewEdit = await Review.findByPk(reviewId)
    if(!reviewEdit) {
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if(reviewEdit.userId !== user.id){
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
          })
    }
    reviewEdit.set({
        review,
        stars
    })
    await reviewEdit.save()
    res.json(reviewEdit)
})

//delete a review
router.delete('/:reviewId', restoreUser, requireAuth, async(req, res, next) => {
    const {reviewId} = req.params
    const {user} = req
    const deleteReview = await Review.findByPk(reviewId)
    if(!deleteReview) {
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if(deleteReview.userId === user.id) {
        await deleteReview.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.statusCode = 403
        res.json({
            "message": "Review must belong to the current user",
            "statusCode": 403
    })
}
})
module.exports = router;
