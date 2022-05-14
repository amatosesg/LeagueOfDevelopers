const mongoose = require('mongoose');
const { jugadorEnSala } = require('./AppData');

const SalasSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('salas', SalasSchema);