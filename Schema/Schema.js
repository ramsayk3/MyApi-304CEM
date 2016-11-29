'use strict'

const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://ramsayk3:Ramsay-95@ds159737.mlab.com:59737/304moviedb')

mongoose.Promise = global.Promise
const schema = mongoose.Schema

const movieSchema = new schema({
    title: String,
    year: Number,
    plot: String,
    imdbRating: Number,
    imdbID: String   
})

exports.Movie = mongoose.model('Movie', movieSchema)