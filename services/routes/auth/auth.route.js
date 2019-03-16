const express = require('express')
const auth = express.Router()
const authCtrl = require('../../controllers/auth/auth.controller')

auth.post('/', authCtrl.AuthToken)

module.exports = auth