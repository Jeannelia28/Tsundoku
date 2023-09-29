const { response } = require('express');
const Capitulo = require('../models/librosModels/capsModel');
const { validationResult } = require('express-validator');

const { obraID } = require('../controller/obraController') // se requiere el id de la obra
const Sesiones = require('../models/user_sessions');

let capID;

//Controlador del capitulo
const CreateCapitulo = async (req, res = response) => {
    //captura el token de la peticion
    const tokenValue = req.token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //verifica que la sesion se valida
    const sesion = await Sesiones.findOne({ tokenValue });

    const { title } = req.body;
    const capitulo = new Capitulo({ bookOrigin: obraID, title, author: sesion.user });

    await capitulo.save();

    const capID = capitulo._id;

    res.json({
        msg: '¡Nuevo capítulo creado!',
        msg: 'Es hora de agregar nuevas páginas al capítulo'
    });
}


module.exports = { CreateCapitulo, capID }