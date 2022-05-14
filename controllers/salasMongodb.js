const salaModel = require('../models/salasMongodb');

//OBTENER DATA DE SALAS
exports.getData = async(req, res) => {
    try {
        const salas = await salaModel.find()
        res.status(200).json({ data: salas })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

//INSERTAR DATA DE JUGADORES EN SALA
exports.insertData = async(req, res) => {
    const data = req.body;

    try {
        const newRoom = new salaModel(data)
        const roomStored = newRoom.save()
        res.status(200).json(roomStored)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}




