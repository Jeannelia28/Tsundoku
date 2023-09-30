const { response } = require('express');
const Pagina = require('../models/librosModels/pagesModel');
const { validationResult } = require('express-validator');

const Usuario = require('../models/user');
const Capitulo = require('../models/librosModels/capsModel');

//Controlador del capitulo
const CreatePagina = async (req, res = response) => {
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

    const {capID , contenido } = req.body;

    Capitulo.findById(capID, (error) => {
        if (error) {
            console.error(error);
        }
    });
    
    const pagina = new Pagina({ capID, contenido });

    await pagina.save();

    res.json({
        msg: 'OK'
    });
}


module.exports = { CreatePagina }