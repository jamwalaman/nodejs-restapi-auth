const asyncHandler = require('express-async-handler')
const Movie = require('../models/Movie')

// Get all movies
// GET /api/movies
const getMovies = asyncHandler (async (req, res) => {
    const movies = await Movie.find()
    res.status(200).json(movies)
})

// Create a movie
// POST /api/movies
const createtMovie = asyncHandler (async (req, res) => {
    if (!req.body.title) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const movie = await Movie.create({
        title: req.body.title,
        director: req.body.director,
        synopsis: req.body.synopsis

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
    await movie.deleteOne()
    res.status(200).json({id: req.params.id})
})

module.exports = {getMovies, createtMovie, updateMovie, deleteMovie}