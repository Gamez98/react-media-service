const c = require('../../config/db.config')
const jwt = require('jsonwebtoken')
const cnfg = require('../../config/config')

exports.insertUser = (req, res) => {
   if (req.body) {
      const verify = `select * from users where username = '${req.body.username}'`
      console.log(verify)
      c.connection.query(verify, (e, r) => {
         if (e) { throw e }
         if (r.length > 0) {
            res.json({ 'success': false, 'message': 'username already taken...' })
         }  else {
               const sql = `insert into users set ?`;
               c.connection.query(sql, req.body, (err, result) => {
                  res.json({ 'success': true, 'message': 'user registered!' })
               })
            }
         }
      )
   }  else {
         res.json({ 'success': false, 'message': 'insert user data...' })
   }
}

exports.getInfo = (req, res) => {
   const sql = `select * from users where username='${req.decoded._clientUname}'`;
   c.connection.query(sql, (err, result, fields) => {
      res.json({ 'success': true, 'message': 'info found!', result })
   })
}

exports.updateInfo = (req, res) => {
   const sql = `update users set ? where username='${req.decoded._clientUname}'`;
   c.connection.query(sql, req.body, (err, result) => {
      if (err) {
         throw err
      }  else {
            res.json({ 'success': true, 'message': 'user updated!', result })
         }
      }
   )
}

exports.deleteInfo = (req, res) => {
   const sql = `delete from users where username='${req.decoded._clientUname}'`;
   c.connection.query(sql, (err, result) => {
      if (err) {
         throw err
      } else {
         res.json({ 'success': true, 'message': 'user removed...', result })
      }
   })
}