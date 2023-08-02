const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        title: {type: String, required: [true, 'Please add the film title']},
        director: {type: String, required: [true, 'Please add the film director']},
        synopsis: {type: String},
    },
    {timestamps: true}
    );

module.exports = mongoose.model('Movie', MovieSchema)
