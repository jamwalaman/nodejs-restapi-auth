const express = require('express')
const router = express.Router()
const {getMovies, oneMovie, createtMovie, updateMovie, deleteMovie} = require('../controllers/movieController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getMovies).post(protect, createtMovie)
router.route('/:id').get(oneMovie).put(protect, updateMovie).delete(protect, deleteMovie)

module.exports = router
