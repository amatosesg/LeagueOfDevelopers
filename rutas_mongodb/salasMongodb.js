const express = require('express');

const controller = require('../controllers/salasMongodb')

const router = express.Router()

const path = 'salasMongodb'

router.get(
    
       `/${path}`,
        controller.getData
    
)

router.post("/salasMongodb", controller.insertData);

module.exports = router