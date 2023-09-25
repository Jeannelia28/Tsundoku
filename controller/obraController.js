const { response } = require('express');

const Obra = require('../models/librosModels/obraModel')
const { validationResult } = require('express-validator')

const { validarJWT } = require('../middlewares/validar-jwt');

const Usuario = require('../models/user');

const CreateObra = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const usuario = await Usuario.findById(uid);

    const { title, category, description, author } = req.body;
    const obra = new Obra({ title, category, description, author: usuario.uid });

    const existeCategory = await Obra.findOne({ category });
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