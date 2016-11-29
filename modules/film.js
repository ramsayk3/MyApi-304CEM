const request = require("request")


exports.searchMovie = function(movieSearch, callback) {
    const search = { method: 'GET',
        url: 'http://www.omdbapi.com/',
        qs: { s: movieSearch, r: 'json' },
    }
  request(search, function (error, response, body) {
        if (error) throw new Error(error)
        return callback(null, JSON.parse(body))
  })
}

exports.getMovie = function(input, type, year, callback) {
    request(`http://www.omdbapi.com/?${type}=${input}&y=${year}`,
            function (error, response, body) {
        
        if (error) throw new Error(error)
        return callback(null, JSON.parse(body))
    })
}
exports.addMovie = function(imdbID, callback) {
	const url = `'http://www.omdbapi.com/?i=${imdbID}`

	request.get( url, (err, res, body) => {
		if (err) return callback(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			console.log('no results')
			return callback(Error('movie not found'))
		}
		const data = {
			title: json.Title[0],
			Year: json.Year[0],
			Plot: json.Plot[0],
            imdbID: json.imdbID[0]
		}

		console.log('define the movie to add')
		const book = new Book({
			title: data.title,
			authors: data.authors,
			description: data.description
		})

		console.log('Adding movie to your favourites')
		movieSchema.save( function(err, movie) {
			console.log('attempt made')
			if (err) {
				console.log('an error adding movie')
				callback( Error(`database error: ${err}`) )
			}
			console.log('movie added')
			console.log(movie)
			return callback(null, movie)
		})
	})
}