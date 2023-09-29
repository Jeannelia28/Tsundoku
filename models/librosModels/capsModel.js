const { Schema, model } = require('mongoose');

const CaptitulosSchema = Schema({
    bookOrigin: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, 'El capitulo debe contener el titulo']
    },
    contenido: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})



CaptitulosSchema.methods.toJSON = function () {
    const { __v, _id, ...cap } = this.toObject();
    cap.uid = _id;
    return cap;
}

module.exports = model('Capitulos', CaptitulosSchema);