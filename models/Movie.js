const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        username: {type: mongoose.Schema.Types.String, required: true, ref: 'User'},
        title: {type: String, required: [true, 'Please add the film title']},
        director: {type: String, required: [true, 'Please add the film director']},
        synopsis: {type: String, required: [true, 'Please add the film synopsis']},
        release_date: {type: Date},
    },
    {timestamps: true}
    );

module.exports = mongoose.model('Movie', MovieSchema)
