const express = require('express')
const user = express.Router()
const userCtrl = require('../../controllers/user/user.controller')
const token = require('../../services/token.service')

user.get('/', token.getToken, userCtrl.getInfo)
user.post('/', userCtrl.insertUser)
user.put('/', token.getToken, userCtrl.updateInfo)
user.delete('/', token.getToken, userCtrl.deleteInfo)

module.exports = user