const playerModel = require('../models/jugadorMongodb');
const salaModel = require('../models/salasMongodb');

async function dummySalaCreator(sala) {
    const newSala = new salaModel(sala)
    try {
        await newSala.save()
    } catch (err) {
        console.error(err)
    }
}

async function dummyUserCreator(user) {
    await dummySalaCreator({
        name: 'sala Valkyria',
    })

    const salasTotal = await salaModel.find()
        // Añadiendo el usuario a la primera sala, sólo por demostración
    try {
        const newUser = new playerModel({...user, IdSala: salasTotal[0]._id })
        await newUser.save()
    } catch (err) {
        console.error(err)
    }
}


//Creación de sala de juego (solo para pruebas)
// dummySalaCreator({
//     name: 'sala Thor',
// })

// dummySalaCreator({
//     name: 'sala Freya',
// })

// dummySalaCreator({
//     name: 'sala Loki',
// })


// dummyUserCreator({
//     Name: 'OtherOne',
//     Surname: 'Murdock',
//     Email: 'example2@gmail.com',
//     Password: '1234',
//     State: 'online',
//     City: 'Pochinki',
//     Avatar: 'avatar1.png',
//     Color: 'red',
// })

//OBTENER DATA DE JUGADORES
exports.getData = async(req, res) => {
    try {
        const users = await playerModel.find()

        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

//INSERTAR DATA DE JUGADORES
exports.insertData = async(req, res) => {
    const { body } = req

    try {
        const newUser = new playerModel(body)
        const userStored = await newUser.save()

        res.status(200).json({ data: userStored })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

//LOGIN JUGADORES
exports.loginData = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await playerModel.findOne({ Email: email, Password: password })
        if (!user) return res.status(404).json({ message: 'Email o contraseña incorrectos.' })

        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

//JUGADOR EN ESPERA
exports.jugadorEnEspera = async(req, res) => {
    try {
        // Si en algún momento vas a limpiar la sala del usuario porque se deslogueo
        // develvelo a su valor inicial (null), de esa manera esta consulta servirá sin errores
        // Esta consulta quiere decir: $exists se asegura de que el campo "IdSala" exista en el doc.
        // $type busca el tipo específico del campo, en este caso: null
        const players = await playerModel.find({ IdSala: { $exists: true, $type: 'null' } })
        res.status(200).json(players)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

//JUGADOR EN SALA
exports.jugadorEnSala = async(req, res) => {
    const salaJuego = req.body.salaId;
    const emailJugador = req.body.jugador;

    try {
        const salaResult = await salaModel.findById(salaJuego)
        if (!salaResult) return res.status(404).json({ message: 'This room doesn\'t exist' })

        const filter = { Email: emailJugador }
        const update = { IdSala: salaJuego }
        const jugador = await playerModel.findOneAndUpdate(filter, update, { new: true })

        if (!jugador) return res.status(404).json({ message: 'this user doesn\'t exist' })

        return res.status(200).json({ message: 'user added to room' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }

}