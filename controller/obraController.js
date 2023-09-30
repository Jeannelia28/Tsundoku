const { response } = require('express');
const Generos = require('../models/librosModels/generosLibrosModel');
const Obra = require('../models/librosModels/obraModel')
const { validationResult } = require('express-validator')

const Usuario = require('../models/user');
const { default: mongoose } = require('mongoose');

const CreateObra = async (req, res = response) => {

    //captura el usario de la peticion
    const user = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    Usuario.findById(user.id, (error) => {
        if (error) {
            console.error(error);
        }
    });

    const { title, category, description } = req.body;
    const obra = new Obra({ title, category, description, author: user.id });

    const genero = mongoose.model('Generos', Generos.GeneroLibrosSchema, 'dca_generos_libros');

    const existeCategory = await genero.findOne({ category });
    if (!existeCategory) {
        return res.status(412).json({
            msg: 'La categoria seleccionada no existe'
        });
    }

    await obra.save();

    res.json({
        msg: 'Obra registrada exitosamente'
    });

}

module.exports = { CreateObra };