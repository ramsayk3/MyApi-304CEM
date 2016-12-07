'use strict'
const schema = require('../Schema/Schema')
const schema1 = require('../Schema/Schema').Movie
const omdb = require('./film')
exports.saveMovie = (movieData, callback) => {
    if (!'title' in movieData && !'year' in movieData && !'plot' in movieData && !'imdbRating' in movieData && !'imdbID' in movieData) {
        callback(new Error('Not a correct movie object'))
    }
    const movie = new schema.Movie(movieData)
    movie.save((err, movie) => {
        if (err) {
            callback(new Error('Could not save movie'))
        }
        callback(null, movie)
    })
}
exports.showFavourites = function (err, callback) {
    schema.Movie.find({}, function (err, movies) {
        if (err) {
            console.log('could not fetch movies')
            throw err
        }
        return callback(null, movies)
    })
}
exports.showFavouritebyid = function (id, callback) {
    schema.Movie.find({imdbID: id}, function (err, movies) {
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}
exports.remove = function (id, callback) {
    schema.Movie.remove({imdbID: id}, function (err, movies) {
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}
exports.updaterating = function (id, imdbRating, callback) {
    schema.Movie.findOneAndUpdate({imdbID: id}, {"imdbRating": imdbRating}, function (err, movies) {
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}