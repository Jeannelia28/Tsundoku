const express = require('express')

const controller = require('../controller/user')
const { check } = require('express-validator')

const router = express.Router()

/** router metodo get para usuarios */
router.get('/',controller.usuariosGet)
router.post('/',[
   check('email','El correo no es valido').isEmail(),
], controller.usuariosPost)

module.exports = router