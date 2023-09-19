const {response} = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/user');
const { validationResult } = require('express-validator');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get user - controlador'
    });
}

const usuariosPost = async(req, res = response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const {name, email, password} = req.body;
    const usuario = new Usuario({name, email, password});

    //verificar si el correo existe 
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }
    //encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost
}