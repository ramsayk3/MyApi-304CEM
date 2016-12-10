'use strict'
const schema = require('../Schema/Schema')
exports.saveMovie = (movieData, callback) => {
    
    const movie = new schema.Movie(movieData)
    schema.Movie.find({
        imdbID: movieData.imdbID
    }, function (err, movies) {
        if (movies.length === 0) {
            movie.save((err, movie) => {
/* istanbul ignore next */                if (err) {
                    callback(new Error('Could not save movie'))
                }
                callback(null, movie)
            })
        }
        else {
            callback('Denied as duplicate')
        }
    })
}
exports.showFavourites = function (callback) {
    schema.Movie.find({}, function (err, movies) {
        if (err) {
            callback(new Error)
        }
        callback(null, movies)
    })
}
exports.showFavouritebyid = function (id, callback) {
    schema.Movie.find({
        imdbID: id
    }, function (err, movies) {
        if (movies.length === 0) {
            callback(new Error)
        }
        callback(null, movies[0])
    })
}
exports.remove = function (id, callback) {
    schema.Movie.remove({
        imdbID: id
    }, function (err, movies) {
        if (id < 2) {
             callback(new Error)
        }
        callback(null, movies)
    })
}
exports.updaterating = function (id, imdbRating, callback) {
    schema.Movie.findOneAndUpdate({
        imdbID: id
    }, {
        'imdbRating': imdbRating
    }, function (err, movies) {
        if (id < 2) {
             return callback(new Error('Pass a valid id'))
        }
        callback(null, movies)
    })
}
