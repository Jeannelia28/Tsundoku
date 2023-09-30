const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { CreatePagina } = require('../controller/pageController')

const router = Router();

router.post('/', validarJWT, [
    check('capID', 'Debe indicar a que capitulo pertenece'),
    check('contenido', 'La página no puede estar vacía').not().isEmpty(),
    validarCampos
], CreatePagina)

module.exports = router;