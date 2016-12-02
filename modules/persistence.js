'use strict'
const schema = require('../Schema/Schema')
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
exports.retrieveFavourites = ((favouriteList, callback) => {
    schema.Movie.find((err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error("No movies in the list"))
        resolve(docs)
    })
})

exports.retrieveFavouritebyid = (req, res) => {
    const id = req.params.id
    
    omdb.showFavouritebyid(id, (err, result)=>{
        if (err) return res.send(400, err)
        return res.send(result)
    })
    
}


/*
exports.deleteFavourite = ((favouriteList, callback) => {
    schema.Movie.remove((err, docs) => {
        if (err){
            callback(new Error('Could not delete movie'))
        }
        console.log('Deleted Movie')
        callback(null,movie)
        resolve(docs)
    })
})
*/