'use strict'

const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://ramsayk3:Ramsay-95@ds159737.mlab.com:59737/304moviedb')

mongoose.Promise = global.Promise
const schema = mongoose.Schema

const movieSchema = new schema({
    Title: {type: String},
    Year: {type: Number},
    Plot: {type: String},
    imdbRating: {type: String},
    imdbID: {type: String},
    Owner: {type: String}
})

exports.Movie = mongoose.model('Movie', movieSchema)