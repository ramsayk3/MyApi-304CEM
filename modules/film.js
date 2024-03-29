'use strict'
const request = require('request')
const db = require('./persistence.js')
/**
*@module Film Module
*/

/**
*Searches For Movies Based On Parameter Entered
*@function
*@Param {String} movieSearch - Movie To Find
*@Param {String} callback - Search Results
*@Returns {JSON} Search Results
*@throws Will throw error if search entered is undefined
*@throws Will throw error if omdb server is down
*/
exports.searchMovie = function(movieSearch, callback) {
	if (movieSearch === undefined) {
		callback(new Error('Pass In A Search'))
	} else {
		request(`http://www.omdbapi.com/?s=${movieSearch}`, function(err, response, body) {
		/* istanbul ignore next */
			if (err) {
				callback(new Error(err))
			} else {
				return callback(null, JSON.parse(body))
			}
		})
	}
}
/**
*Searches For Movie Based On Specific Parameters Entered
*@function
*@Param {String} input - Movie To Find
*@Param {String} type - 'n' For Text Search OR 'i' For imdbID Search
*@Param {String} year - Year Of Film
*@Param {String} callback - Search Results
*@Returns {JSON} Specific Movie Data
*@throws Will throw error if omdb server is down
*/
exports.getMovie = function(input, type, year, callback) {
	request(`http://www.omdbapi.com/?${type}=${input}&y=${year}`, function(err, response, body) {
		/* istanbul ignore next */
		if (err) {
			callback(new Error(err))
		} else {
			return callback(null, JSON.parse(body))
		}
	})
}
/**
*Searches For Movie To Be Added To DB Based On Parameter Entered
*@function
*@Param {String} imdbID - Movie imdbID
*@Param {String} callback - Search Result
*@see module: Persistence Module
*@Returns {JSON} Movie Data To Be Added
*@throws Will throw error if no movie is found to be added
*@throws Will throw error if omdb server is down
*@throws Will throw error if cant save movie to favourites list
*/
exports.addMovie = function(imdbID, callback) {
	const url = `http://www.omdbapi.com/?i=${imdbID}`

	request.get(url, (err, res, body) => {
		/* istanbul ignore next */
		if (err) return callback(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.Response === 'False'){
			return callback(new Error('movie not found'))

		}

		db.saveMovie(json, function(err, movie) {
			if (err) {
				callback(new Error(`database error: ${err}`))
			} else {
				return callback(null, movie)
			}
		})
	})
}
