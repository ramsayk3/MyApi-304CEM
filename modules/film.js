const request = require("request")
const schema = require("../Schema/Schema.js")
const db = require('./persistence.js')
var ObjectId = require('mongodb').ObjectID
exports.searchMovie = function (movieSearch, callback) {
    const search = {
        method: 'GET'
        , url: 'http://www.omdbapi.com/'
        , qs: {
            s: movieSearch
            , r: 'json'
        }
    , }
    request(search, function (error, response, body) {
        if (error) throw new Error(error)
        return callback(null, JSON.parse(body))
    })
}
exports.getMovie = function (input, type, year, callback) {
    request(`http://www.omdbapi.com/?${type}=${input}&y=${year}`, function (error, response, body) {
        if (error) throw new Error(error)
        return callback(null, JSON.parse(body))
    })
}
exports.addMovie = function (imdbID, callback) {
    const url = `http://www.omdbapi.com/?i=${imdbID}`
    request.get(url, (err, res, body) => {
        if (err) return callback(Error('could not complete request'))
        const json = JSON.parse(body)
        if (json.totalItems === 0) {
            return callback(Error('movie not found'))
        }
        const data = {
            title: json.Title
            , Year: json.Year
            , Plot: json.Plot
            , imdbID: json.imdbID
            , imdbRating: json.imdbRating
        }
        db.saveMovie(json, function (err, movie) {
            if (err) {
                callback(Error(`database error: ${err}`))
            }
            return callback(null, movie)
        })
    })
}