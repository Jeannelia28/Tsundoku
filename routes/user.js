const express = require('express')

const controller = require('../controller/user')
const { check } = require('express-validator')

const router = express.Router()

/** router metodo get para usuarios */
router.get('/', controller.usuariosGet)
router.post('/', [
   check('name', 'El nombre es requerido').not().isEmpty(),
   check('password', 'Debe ingresar su contraseña').not().isEmpty(),
   check('email', 'El correo no es valido').isEmail(),
], controller.usuariosPost)

module.exports = router