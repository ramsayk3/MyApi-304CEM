'use strict'
const schema = require('../Schema/Schema')
exports.saveMovie = (movieData, callback) => {
    if (!'title' in movieData && !'year' in movieData && !'plot' in movieData && !'imdbRating' in movieData && !'imdbID' in movieData) {
        callback(new Error('Not a correct movie object'))
    }
    const movie = new schema.Movie(movieData)
    schema.Movie.find({
        imdbID: movieData.imdbID
    }, function (err, movies) {
        if (movies.length === 0) {
            movie.save((err, movie) => {
                if (err) {
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
            throw err
        }
        return callback(null, movies)
    })
}
exports.showFavouritebyid = function (id, callback) {
    schema.Movie.find({
        imdbID: id
    }, function (err, movies) {
        console.log(movies)
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}
exports.remove = function (id, callback) {
    schema.Movie.remove({
        imdbID: id
    }, function (err, movies) {
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}
exports.updaterating = function (id, imdbRating, callback) {
    schema.Movie.findOneAndUpdate({
        imdbID: id
    }, {
        'imdbRating': imdbRating
    }, function (err, movies) {
        if (err) {
            throw err
        }
        return callback(null, movies)
    })
}