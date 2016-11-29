'use strict'

const schema = require('../Schema/Schema')

exports.saveMovie = movieData => new promise( (resolve, reject)=>{
    if (!'title' in movieData && !'year' in movieData && !'plot' in movieData && !'imdbRating' in movieData && !'imdbID' in movieData){
        reject(new Error('Not a correct movie object'))
    }
    const movie = new schema.Movie(movieData)
    
    movie.save( (err, movie)=> {
        if (err) {
            reject(new Error('Could not save movie'))
        }
        resolve(movie)
    })
})