const express = require('express');

const controller = require('../controllers/jugadorMongodb')

const router = express.Router()

const path = 'jugadorMongodb'

router.get(

        `/${path}`,
        controller.getData

)

router.post("/jugadorMongodb", controller.insertData);


module.exports = router;