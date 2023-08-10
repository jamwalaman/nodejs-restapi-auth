const asyncHandler = require('express-async-handler')
const Movie = require('../models/Movie')
const User = require('../models/User')

// Get all movies
// GET /api/movies
const getMovies = asyncHandler (async (req, res) => {
    const movies = await Movie.find({user: req.user.id})
    res.status(200).json(movies)
})

// Create a movie
// POST /api/movies
const createtMovie = asyncHandler (async (req, res) => {
    const {title, director, synopsis} = req.body
    if (!title || !director || !synopsis) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const movie = await Movie.create({
        title: req.body.title,
        director: req.body.director,
        synopsis: req.body.synopsis,
        user: req.user.id

    })
    res.status(200).json(movie)
})

// Update a movie
// PUT /api/movies/:id
const updateMovie = asyncHandler (async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        res.status(400)
        throw new Error('Movie not found')
    }
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if(movie.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedMovie)
})

// Delete a movie
// DELETE /api/movies/:id
const deleteMovie = asyncHandler (async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        res.status(400)
        throw new Error('Movie not found')
    }
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if(movie.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await movie.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {getMovies, createtMovie, updateMovie, deleteMovie}
