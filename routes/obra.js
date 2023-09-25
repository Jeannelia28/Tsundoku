const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { CreateObra } = require('../controller/obraController')

const router = Router();

router.post('/', validarJWT, [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('category', 'Debe indicar a la categoria que pertenece su obra').not().isEmpty(),
    validarCampos
], CreateObra)

module.exports = router;