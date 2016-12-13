'use strict'
const restify = require('restify')
const server = restify.createServer()
const omdb = require('./modules/film')
const persist = require('./modules/persistence')

server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.CORS())

const defaultPort = 8080


/**
*@api {GET} /search [Search's OMDB]
*@apiParam {String} [s] Users Search
*@apiDescription This allows the user to search omdb
*@apiSuccess Saw Movie Search
*/
server.get('/search', function(req, res) {
	omdb.searchMovie(req.params.s, function(err, result) {
		if (err) {
			res.send(err)
		}		else {
			res.send(result)
		}
	})
})
/**
*@api {GET} /movie [Search's OMDB using imdbID]
*@apiParam {String} [i] imdbID Search
*@apiParam {String} [n] Movie Text Search
*@apiParam {String} [y] Movie Year
*@apiDescription This allows the user to search omdb using imdbID
*@apiSuccess OK imdbID Movie Search
*/
server.get('/movie', function(req, res) {
	let input
	let type

	if (req.params.n !== undefined) {
		input = req.params.n
		type = 't'
	}	else {
		input = req.params.i
		type = 'i'
	}
	omdb.getMovie(input, type, req.params.y, function(err, result) {
		if (err) {
			res.send(err)
		}		else {
			res.send(result)
		}
	})
})
/**
*@api {POST} /favourites [Add Movie]
*@apiParam {String} [i] imdbID
*@apiDescription This allows the user to add movie to favourites using imdbID
*@apiSuccess OK imdbID Movie Added
*@apiSuccessExample {JSON} Success-Response:
* HTTP/1.1 200 OK
* {
*  "__v": 0,
*  "Title": "Toy Story 3",
*  "Year": 2010,
*  "Plot": "The toys are mistakenly delivered to a day care center instead of the attic right before Andy leaves for college, and it's up to Woody to convince the other toys that they weren't abandoned and to return home.",
*  "imdbRating": "8.3",
*  "imdbID": "tt0435761",
*  "_id": "584f3848fe12e73f0cfc755c"
*}
*@apiError Error Denied as duplicate
*/
server.post('/favourites', function(req, res) {
	omdb.addMovie(req.params.i, function(err, result) {
		if (err) {
			res.send(err)
		}		else {
			res.send(result)
		}
	})
})
/**
*@api {GET} /favourites [Retrieve Favourites List]
*@apiDescription This allows the user get all movies in favourites list
*@apiSuccess OK Favourites List
*/
server.get('/favourites', (req, res) => {
	persist.showFavourites( (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})
/**
*@api {GET} /favourites/:id [Get Favourite by ID]
*@apiDescription This allows the user to retrieve a movie from the favourites list using imdbID
*@apiParam {String} [id] imdbID
*@apiSuccess OK Specific Movie Data
*@apiError Error Pass a valid id
*@apiError Error Id Not In Database
*/
server.get('/favourites/:id', (req, res) => {
	persist.showFavouritebyid(req.params.id, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})
/**
*@api {DEL} /favourites/:id [Delete Favourite by ID]
*@apiParam {String} [id] imdbID Search
*@apiDescription This allows the user to delete a movie from the favourites list using imdbID
*@apiSuccess OK Delete Specific Movie
*@apiError Error Pass a valid id
*/
server.del('/favourites/:id', (req, res) => {
	persist.remove(req.params.id, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})
/**
*@api {PUT} /favourites/:id [Update imdbRating]
*@apiParam {String} [id] imdbID
*@apiParam {String} [rating] New imdbRating
*@apiDescription This allows the user to update a movie rating from the favourites list using imdbID
*@apiSuccess OK Update Movie Rating
*@apiError Error Pass a valid id
*@apiError Error Not in Database
*/
server.put('/favourites/.*', (req, res) => {
	persist.updaterating(req.params.id,req.params.rating, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})


server.get('/.*', restify.serveStatic({
	'directory': './apidoc/',
	'default': 'index.html'
}))
const port = process.env.PORT || defaultPort

server.listen(port, function(err) {
	if (err) {
		console.error(err)
	}	else {
		console.log('App is ready at : ' + port)
	}
})
