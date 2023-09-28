const { Schema, model } = require('mongoose')

const SesionesSchema = Schema({
    user: {
        type: String,
        required: true
    },
    tokenValue: {
        type: String,
        required: true
    },
    expiration: {
        type: Date
    },
    logout: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Sesiones', SesionesSchema);