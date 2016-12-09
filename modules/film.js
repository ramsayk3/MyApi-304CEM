'use strict'
const request = require('request')
const db = require('./persistence.js')

exports.searchMovie = function(movieSearch, callback) {
	const search = {
		method: 'GET'
        , url: 'http://www.omdbapi.com/'
        , qs: {
	s: movieSearch
            , r: 'json'
}
    , }

	request(search, function(error, response, body) {
 /* istanbul ignore next */	if (error) throw new Error(error)
		return callback(null, JSON.parse(body))
	})
}
exports.getMovie = function(input, type, year, callback) {
	request(`http://www.omdbapi.com/?${type}=${input}&y=${year}`, function(error, response, body) {
/* istanbul ignore next */		if (error) callback(new Error(error))
		return callback(null, JSON.parse(body))
	})
}
exports.addMovie = function(imdbID, callback) {
	const url = `http://www.omdbapi.com/?i=${imdbID}`
	request.get(url, (err, res, body) => {
/* istanbul ignore next */		if (err) return callback(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			return callback(Error('movie not found'))
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
