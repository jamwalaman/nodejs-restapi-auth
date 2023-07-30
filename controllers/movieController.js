const asyncHandler = require('express-async-handler')

// Get all movies
// GET /api/movies
const getMovies = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get all movies'})
})

// Create a movie
// POST /api/movies
const createtMovie = asyncHandler (async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Created movie'})
})

// Update a movie
// PUT /api/movies/:id
const updateMovie = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Updated movie ${req.params.id}`})
})

// Delete a movie
// DELETE /api/movies/:id
const deleteMovie = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Deleted movie ${req.params.id}`})
})

module.exports = {getMovies, createtMovie, updateMovie, deleteMovie}