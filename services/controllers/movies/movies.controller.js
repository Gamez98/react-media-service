const c = require('../../config/db.config')
const jwt = require('jsonwebtoken')
const cnfg = require('../../config/config')

exports.getAll = (req, res) => {
   const sql = `select * from movies`
   c.connection.query(sql, (err, result, fields) => {
      if (err) { throw err; }
      if (result.length > 0) {
         res.json({ 'success': true, 'message': 'movies found!', result })
      }  else {
         res.json({ 'success': false, 'message': 'not movies found' })
      }
   })
}

exports.Category = (req, res) => {
   const sql = `select * from movies where category = '${req.params.category}'`
   c.connection.query(sql, (err, result, fields) => {
      if (err) { throw err; }
      if (result.length > 0) {
         res.json({ 'success': true, 'message': 'movies found!', result })
      } else {
         res.json({ 'success': false, 'message': 'not category found' })
      }
   })
}

exports.GetCategories = (req, res) => {
   const sql = `select distinct category from movies`;
   c.connection.query(sql, (err, result, fields) => {
      if (err) { throw err; }
      if (result.length > 0) {
         res.json({ 'success': true, 'message': 'category found', result })
      } else {
         res.json({ 'success': false, 'message': 'not category found' })
      }
   })
}

exports.UserList = (req, res) => {
   const sql = `select * 
      from user_movie_list 
      inner join users on user_movie_list.user_id = users.id
      inner join movies on user_movie_list.movie_id = movies.id
      where users.username='${req.decoded._clientUname}';`
      c.connection.query(sql, (err, result, fields) => {
        if (err) { throw err; }
        res.json({ 'success': true, 'message': 'favorite movies found!', result })
    })
}

exports.getMovie = (req, res) => {
   const sql = `select * from movies where title like '%${req.params.movie_name}%'`
   c.connection.query(sql, (err, result, fields) => {
      if (err) { throw err; }
      if (result.length > 0) {
         res.json({ 'success': true, 'message': 'movies found!', result })
      } else {
         res.json({ 'success': false, 'message': 'not movies found' })
      }
   })
}

exports.insertFavorite = (req, res) => {
   console.log(req.decoded._clientId, req.body.movie_id)
   const { movie_id } = req.body;
   const sql = `insert into user_movie_list (user_id, movie_id) values (?,?)`
   c.connection.query(sql, [req.decoded._clientId, movie_id], (err, result, fields) => {
      if (err) { throw err; }
      res.json({ 'success': true, 'message': 'favorite movie inserted!', result })
   })
}

exports.deleteFavorite = (req, res) => {
   console.log(req.decoded._clientId, req.body.movie_id)
   const { movie_id } = req.body;
   const sql = `delete from user_movie_list where movie_id=${movie_id}`
   c.connection.query(sql, [req.decoded._clientId, movie_id],(err, result, fields) => {
      if (err) { throw err; }
      res.json({ 'success': true, 'message': 'favorite movie deleted!', result })
   })
}