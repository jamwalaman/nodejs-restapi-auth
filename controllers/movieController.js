const asyncHandler = require('express-async-handler')
const Movie = require('../models/Movie')
const {body, validationResult } = require('express-validator')

// Get all movies
// GET /api/movies
const getMovies = asyncHandler (async (req, res) => {
    const movies = await Movie.find({}).sort({createdAt: - 1})
    res.status(200).json(movies)
})

// Get a movie by id
// GET /api/movies/:id
const oneMovie = asyncHandler (async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        res.status(400)
        throw new Error('Movie not found')
    }
    res.status(200).json(movie)
})

// Create a movie
// POST /api/movies
const createtMovie = [
    body('title').trim().notEmpty().escape().withMessage('Film title is required'),
    body('director').trim().notEmpty().escape().withMessage('Film director is required'),
    body('synopsis').trim().notEmpty().escape().withMessage('Film synopsis is required'),
    body('release_date', 'Invalid date').optional({values: 'falsy'}).isISO8601().toDate(),
    asyncHandler (async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.status(400)
            throw new Error(JSON.stringify(errors.mapped()))
        }

        const movie = await Movie.create({
            title: req.body.title,
            director: req.body.director,
            synopsis: req.body.synopsis,
            release_date: req.body.release_date,
            user: req.user.id,
            username: req.user.name
        })
        
        res.status(200).json(movie)
    })
]

// Update a movie
// PUT /api/movies/:id
const updateMovie = [
    body('title').trim().escape(),
    body('director').trim().escape(),
    body('synopsis').trim().escape(),
    body('release_date', 'Invalid date').optional({values: 'falsy'}).isISO8601().toDate(),
    asyncHandler (async (req, res) => {
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
        const data = {}
        data.title = req.body.title ? req.body.title : movie.title
        data.director = req.body.director ? req.body.director : movie.director
        data.synopsis = req.body.synopsis ? req.body.synopsis : movie.synopsis
        data.release_date = req.body.release_date ? req.body.release_date : movie.release_date
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, data, {new: true})
        res.status(200).json(updatedMovie)
    })
]

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

module.exports = {getMovies, oneMovie, createtMovie, updateMovie, deleteMovie}
