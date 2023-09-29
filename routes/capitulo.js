const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { CreateCapitulo } = require('../controller/capsController')

const router = Router();

router.post('/', validarJWT, [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos
], CreateCapitulo)

module.exports = router;