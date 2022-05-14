const mongoose = require('mongoose');

const JugadorSchema = new mongoose.Schema(
    {
        Name: {
            type: String
        },
        Surname: {
            type: String
        },
        Email: {
            type: String,
            unique: true,
            required: true
        },
        Password: {
            type: String,
        },
        State: {
            type: String,
        },
        City: {
            type: String,
        },
        Avatar: {
            type: String
        },
        Color: {
            type: String,
            default: null
        },
        IdSala: {
            type: String,
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('jugadores', JugadorSchema);