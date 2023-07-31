const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
    {
        title: {type: String, required: [true, 'Please add the film title']},
        director: {type: String, required: [true, 'Please add the film director']},
        synopsis: {type: String},
    },
    {timestamps: true}
    );

module.exports = mongoose.model('Movie', MovieSchema)
