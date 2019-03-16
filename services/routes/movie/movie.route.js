const express = require('express')
const movie = express.Router()
const movieCtrl = require('../../controllers/movies/movies.controller')
const token = require('../../services/token.service')

movie.get('/', token.getToken, movieCtrl.getAll)
movie.get('/category/(:category)', token.getToken, movieCtrl.Category)
movie.get('/categories', token.getToken, movieCtrl.GetCategories)
movie.get('/user/list', token.getToken, movieCtrl.UserList)
movie.post('/add/favorite', token.getToken, movieCtrl.insertFavorite)
movie.delete('/remove/favorite', token.getToken, movieCtrl.deleteFavorite)
movie.get('/(:movie_name)', token.getToken, movieCtrl.getMovie)

module.exports = movie