require('dotenv').config();
const jwt = require('jsonwebtoken');
const Sesiones = require('../models/user_sessions');


const validarJWT = async (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization;
    // console.log(req.rawHeaders);
    // const token = req.rawHeaders[1];

    // Verificar si no hay token
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }
    const tokenValue = req.headers.authorization.split(" ")[1];

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);

        // Verificar la fecha de expiración del token
        const expDate = new Date(decoded.exp * 1000); // Convertir a milisegundos

        if (expDate <= Date.now()) {
            return res.status(401).json({ message: 'Inicie sesión nuevamente' });
        }

        const sesion = await Sesiones.findOne({ tokenValue });
        if (!sesion) {
            res.status(401).json({ message: 'Su sesion no es valida' });
        }

        // Almacenar la información del usuario en req.user
        req.user = decoded;
        req.token = tokenValue;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido.' });
    }
};
module.exports = { validarJWT }