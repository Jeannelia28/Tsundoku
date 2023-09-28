const { Schema, model } = require('mongoose');

const GeneroLibrosSchema = Schema({
    _id: { type: Number },
    de_genero: { type: String }
})

module.exports = model('Generos', GeneroLibrosSchema);