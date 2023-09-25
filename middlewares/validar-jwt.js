require('dotenv').config();
const jwt = require('jsonwebtoken');
const { response, request } = require('express')

const Usuario = require('../models/user');

const validarJWT = async (req = request, res = response, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userModel.findById(verify.id);
        next();
    } catch (error) {
        return next(error);
    }
}

module.exports = { validarJWT }