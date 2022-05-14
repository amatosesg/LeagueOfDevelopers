const express = require('express');

const controller = require('../controllers/jugadorMongodb')

const router = express.Router()

const path = 'jugadorMongodb'

router.get(

    `/${path}`,
    controller.getData

)

router.post("/jugadorMongodb", controller.insertData);

router.delete("/jugadorMongodb/:email", controller.deleteData);

router.put("/jugadorMongodb/:email", controller.updateData);

router.get("/jugadorMongodb/registados", controller.getDataJugador);


module.exports = router;