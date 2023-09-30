const { Schema, model } = require('mongoose');

const PaginasSchema = Schema({
    capID: {
        type: String
    },
    contenido: {
        type: String,
        required: true
    }
})

module.exports = model('Paginas', PaginasSchema);