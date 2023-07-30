const express = require('express')
const router = express.Router()
const {getMovies, createtMovie, updateMovie, deleteMovie} = require('../controllers/movieController')

router.route('/').get(getMovies).post(createtMovie)
router.route('/:id').put(updateMovie).delete(deleteMovie)

module.exports = router
