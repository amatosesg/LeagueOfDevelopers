const { connection, connect  } = require('mongoose')

const mongodbURI = 'mongodb://localhost:27017/cool-game'

const dbConnection = async () => {
    await connect(mongodbURI)
}

connection.on('connected', () => console.log('MongoDB connected.'))

connection.on('error', (err) => console.error(err))

module.exports = dbConnection