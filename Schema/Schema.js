'use strict'

const mongoose = require('mongoose')

const db = mongoose.connect('mongodb://ramsayk3:Ramsay-95@ds159737.mlab.com:59737/304moviedb')

mongoose.Promise = global.Promise

const movieSchema = new Schema({
    title: String,
    year: Integer,
    plot: String,
    imdbRating: Integer,
    imdbID: Varchar   
})

exports.Movie = mongoose.model('Movie', movieSchema)