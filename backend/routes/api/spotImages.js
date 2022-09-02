const express = require('express');

const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const {SpotImage, Spot, sequelize } = require('../../db/models');

router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
    const {imageId} = req.params
    const {user} = req

    const deleteImage = await SpotImage.findByPk(imageId,{
        include: {
            model: Spot,
            attributes:['ownerId']
        }
    })

    if(!deleteImage){
        res.statusCode = 404
        return res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
          })
    }

    else if(deleteImage.Spot.ownerId === user.id){
        await deleteImage.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.statusCode = 403
        return res.json({
            "message": "Image must belong to the current user",
            "statusCode": 403
        })
    }

})

module.exports = router;
