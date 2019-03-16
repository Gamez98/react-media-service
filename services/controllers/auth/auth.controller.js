const c = require('../../config/db.config')
const jwt = require('jsonwebtoken')
const cnfg = require('../../config/config')

exports.AuthToken = (req, res) => {
   console.log(req.body)
   if (req.body.client_id != "" && req.body.client_secret != "") {
      console.log(req.body)
      const data = req.body.client_id;
      const pwd = req.body.client_secret;
      const sql = `select * from users where username = ? or email = ? and password = ?`;
      c.connection.query(sql, [data, data, pwd], (err, result, fields) => {
         if (err) {
            throw err;
         }  else {
               if (result.length > 0) {
                  if (result[0].password === pwd) {
                     const payload = { _clientId: result[0].id, _clientUname: result[0].username }
                     const server_token = jwt.sign(payload, cnfg.jwt.secret, { expiresIn: '24h' })
                     res.send({ success: true, message: 'authenticated!', server_token })
                  } else {
                     res.send({ success: false, message: 'incorrect password' })
                  }
               } else {
                  res.send({ success: false, message: 'user do not exists' })
               }
           }
         }
      )
   } else {
      res.send({ success: false, message: 'missing email/password' })
   }
}