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
    console.log(url)
    request.get(url, (err, res, body) => {
        if (err) return callback(Error('could not complete request'))
        const json = JSON.parse(body)
        if (json.totalItems === 0) {
            console.log('no results')
            return callback(Error('movie not found'))
        }
        console.log('define the movie to add')
        const data = {
            title: json.Title
            , Year: json.Year
            , Plot: json.Plot
            , imdbID: json.imdbID
        }
        console.log('Adding movie to your favourites')
        db.saveMovie(json, function (err, movie) {
            console.log('attempt made')
            if (err) {
                console.log('an error adding movie')
                callback(Error(`database error: ${err}`))
            }
            console.log('movie added')
            console.log(movie)
            return callback(null, movie)
        })
    })
}