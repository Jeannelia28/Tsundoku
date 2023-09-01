const express = require('express')

const controller = require('../controller/user')

const router = express.Router()

const path = 'user'


/** router metodo get para usuarios */
router.get(
   `/${path}`,
   controller.getData
)

module.exports = router