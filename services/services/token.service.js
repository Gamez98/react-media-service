const c = require('../config/db.config')
const jwt = require('jsonwebtoken')
const cnfg = require('../config/config')

exports.getToken = (req, res, next) => {
   console.log(req.headers)
   req.token = req.headers['x-access-token']
   if (!req.token) {
      res.send({ success: false, message: 'no token provided' })
   } else {
      jwt.verify(req.token, cnfg.jwt.secret, (err, decoded) => {
         if (err) {
            throw err
         } else {
            req.decoded = decoded
            next()
         }
      })
   }
}