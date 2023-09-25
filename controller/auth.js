require('dotenv').config()
const { response } = require('express');
const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
            expiresIn: '24h'
        })

        res.json({
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo ha salido mal'
        });
    }

}

module.exports = { login }