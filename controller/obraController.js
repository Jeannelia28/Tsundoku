const { response } = require('express');
const Generos = require('../models/librosModels/generosLibrosModel');
const Obra = require('../models/librosModels/obraModel')
const { validationResult } = require('express-validator')

const Sesiones = require('../models/user_sessions');
const { default: mongoose } = require('mongoose');

let obraID;

const CreateObra = async (req, res = response) => {

    //captura el token de la peticion
    const tokenValue = req.token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //verifica que la sesion se valida
    const sesion = await Sesiones.findOne({ tokenValue });

    const { title, category, description } = req.body;
    const obra = new Obra({ title, category, description, author: sesion.user });

    const genero = mongoose.model('Generos', Generos.GeneroLibrosSchema, 'dca_generos_libros');

    const existeCategory = await genero.findOne({ category });
    if (!existeCategory) {
        return res.status(412).json({
            msg: 'La categoria seleccionada no existe'
        });
    }

    await obra.save();

    const obraID = obra._id;

    res.json({
        msg: 'Obra registrada exitosamente'
    });

}

module.exports = { CreateObra, obraID };