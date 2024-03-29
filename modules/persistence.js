'use strict'
const schema = require('../Schema/Schema')
/**
*@module Persistence Module
*/

/**
*Saves Movie To DB Based On Data Return
*@function
*@Param {String} movieData - Data exported From addMovie
*@Param {String} callback - Adding Confirmation
*@see module:Film Module
*@Returns {JSON} Movie Data Added
*@throws Will throw error if omdb server is down
*@throws Will throw error if mlab is down
*@throws Will throw error if trying to add a duplicate movie
*/
exports.saveMovie = (movieData, callback) => {
	const movie = new schema.Movie(movieData)

	schema.Movie.find({
		imdbID: movieData.imdbID
	}, function(err, movies) {
        /* istanbul ignore next */
		if (err) {
			callback(new Error(err))
		}
		if (movies.length === 0) {
			movie.save((err, movie) => {
                /* istanbul ignore next */
				if (err) {
					callback(new Error('Could not save movie'))
				}
				callback(null, movie)
			})
		}		else {
			callback('Denied as duplicate')
		}
	})
}
/**
*Shows Movies In Favourites List
*@function
*@Param {String} callback - Favourites List
*@Returns {JSON} Movie Data In Favourites List
*@throws Will throw error if mlab is down
*/
exports.showFavourites = function(callback) {
	schema.Movie.find({}, function(err, movies) {
        /* istanbul ignore next */
		if (err) {
			callback(new Error(err))
		} else {
			callback(null, movies)
		}
	})
}
/**
*Shows Specific Movie In Favourites List
*@function
*@Param {String} id - Movie imdbID
*@Param {String} callback - Movie Data
*@Returns {JSON} Specific Movie Data From Favourites
*@throws Will throw error if mlab is down
*@throws Will throw error if Id entered doesn't exist in the list
*/
exports.showFavouritebyid = function(id,callback) {
	if (id.length === 0) {
		callback(new Error('Pass a valid id'))
	} else {
		schema.Movie.find({
			imdbID: id
		}, function(err, movies) {
        /* istanbul ignore next */
			if (err) {
				callback(new Error(err))
			}
			if (movies.length === 0) {
				callback(new Error('Id Not In Database'))
			} else {
				callback(null, movies[0])
			}
		})
	}
}
/**
*Removes Specific Movie In Favourites List
*@function
*@Param {String} id - Movie imdbID
*@Param {String} callback - Removal Confirmation
*@Returns {JSON} Removal Confirmation
*@throws Will throw error if Id entered invalid
*@throws Will throw error if mlab is down
*/
exports.remove = function(id, callback) {
	if (id.length === 0) {
		callback(new Error('Pass a valid id'))
	} else {
		schema.Movie.remove({
			imdbID: id
		}, function(err, movies) {
        /* istanbul ignore next */
			if (err) {
				callback(new Error(err))
			} else {
				callback(null, movies)
			}
		})
	}
}
/**
*Updates imdbRating To A Specific Movie
*@function
*@Param {String} id - Movie imdbID
*@Param {String} imdbRating - New Movie imdbRating
*@Param {String} callback - Old Movie Data
*@Returns {JSON} Update Confirmation
*@throws Will throw error if Id or imdbRating entered invalid
*@throws Will throw error if mlab is down
*@throws Will throw error if id is not in favourites list
*/
exports.updaterating = function(id, imdbRating, callback) {
	if (id === undefined || imdbRating === undefined) {
		return callback(new Error('Pass a valid id'))
	}	else {
		schema.Movie.findOneAndUpdate({imdbID: id}, {'imdbRating': imdbRating
		}, function(err, movies) {
        /* istanbul ignore next */
			if (err) {
				return callback(new Error(err))
			}
			if (movies === null) {
				callback(new Error('Not in Database'))
			}	else {
				callback(null, movies)
			}
		})
	}
}


