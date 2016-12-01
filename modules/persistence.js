'use strict'

const schema = require('../Schema/Schema')

exports.saveMovie = (movieData, callback) =>{
    if (!'title' in movieData && !'year' in movieData && !'plot' in movieData && !'imdbRating' in movieData && !'imdbID' in movieData){
        callback(new Error('Not a correct movie object'))
    }
    const movie = new schema.Movie(movieData)
    
    movie.save( (err, movie)=> {
        if (err) {
            callback(new Error('Could not save movie'))
        }
        callback(null, movie)
    })
}