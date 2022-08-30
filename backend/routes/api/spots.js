
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const router = express.Router();
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');
//sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all Spots
router.get('/', async (req, res, next) => {

    const allSpots = await Spot.findAll({
        // include: {
        //     model: SpotImage,
        //     where: {
        //         preview: true
        //     },
        //     attributes: ['url']
        // }
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
        let imageUrl = await SpotImage.findOne({  where: { spotId: el.id, preview: true }, attributes: ['url'] })
              if(!imageUrl){
            data = {
                ...el.dataValues,
                avgRating: allRating[0].avgRating,
                previewImage: null
            }

       } else {
          data = {
            ...el.dataValues,
            avgRating: allRating[0].avgRating,
            previewImage: imageUrl
        }
    }
        spot.push(data)
             }
            res.json({
        Spots: spot

    })
});

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


module.exports = router;
