require('dotenv').config()
const { response } = require('express');
const bcryptjs = require('bcrypt')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');
const Sesiones = require('../models/user_sessions');
const { default: mongoose } = require('mongoose');


// Controllador para el inicio de sesion
const login = async (req, res = response) => {

    const { email, password } = req.body;
    const date = new Date();

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

        const sesion = new Sesiones({ user: usuario.id, tokenValue: token, expiration: date.getTime() + (24 * 60 * 60 * 1000) });

        await sesion.save();

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

const logout = async (req, res = response) => {
    const token = req.token;

    // Verifica si el token está presente en la solicitud
    if (!token) {
        return res.status(401).json({
            msg: 'Su sesión no es válida'
        });
    }

    try {
        // Verifica si existe una sesión asociada al token
        const sesion = await Sesiones.findOne({ token });

        if (!sesion) {
            return res.status(401).json({
                msg: 'Su sesión no es válida'
            });
        }

        // Actualiza el campo 'logout' en la sesión
        sesion.logout = true;
        await sesion.save();

        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
}

module.exports = { login, logout }