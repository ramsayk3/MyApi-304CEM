'use strict'
const schema = require('../Schema/Schema')

/**
*Saves Movie To DB Based On Data Return
*@function
*@Param {String} movieData - Request
*@Param {String} callback - Response
@Returns {JSON} Movie Data Added
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
*@Param {String} callback - Response
@Returns {JSON} Movie Data In Favourites List
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
*@Param {String} id - Request
*@Param {String} callback - Response
@Returns {JSON} Specific Movie Data From Favourites
*/
exports.showFavouritebyid = function(id,callback) {
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
/**
*Removes Specific Movie In Favourites List
*@function
*@Param {String} id - Request
*@Param {String} callback - Response
@Returns {JSON} Removal Confirmation
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
*@Param {String} id - Request
*@Param {String} imdbRating - Request
*@Param {String} callback - Response
@Returns {JSON} Removal Confirmation
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


