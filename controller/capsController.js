const { response } = require('express');
const Capitulo = require('../models/librosModels/capsModel');
const { validationResult } = require('express-validator');

const Usuario = require('../models/user');
const Obra = require('../models/librosModels/obraModel')
//Controlador del capitulo
const CreateCapitulo = async (req, res = response) => {
    //captura el usuario de la peticion
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

    const { obraID, title } = req.body;

    Obra.findById(obraID, (error) => {
        if (error) {
            console.error(error);
        }
    });

    const capitulo = new Capitulo({ obraID, title, author: user.id });

    await capitulo.save();

    res.json({
        msg: '¡Nuevo capítulo creado!',
        msg2: 'Es hora de agregar nuevas páginas al capítulo'
    });
}


module.exports = { CreateCapitulo }