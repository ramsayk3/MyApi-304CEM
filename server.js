'use strict'
const restify = require('restify')
const server = restify.createServer()
const omdb = require('./modules/film')
const persist = require('./modules/persistence')

server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.CORS())

const status = {
    OK: 200,
    added : 201,
    badRequest : 400
}
const defaultPort = 8080

server.get('/search', function(req, res) {
	omdb.searchMovie(req.params.s, function(err, result) {
		if (err) {
			res.send(err)
		}		else {
			res.send(result)
		}
        res.end()
	})
})
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
        res.end()
	})
})
server.post('/favourites', function(req, res) {
	omdb.addMovie(req.params.i, function(err, result) {
		if (err) {
			res.send(err)
		}		else {
			res.send(result)
		}
        res.end()
	})
})
server.get('/favourites', (req, res) => {
	persist.showFavourites( (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
        res.end()
	})
})
server.get('/favourites/:id', (req, res) => {
	persist.showFavouritebyid(req.params.id, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
        res.end()
	})
})
server.del('/favourites/:id', (req, res) => {
	persist.remove(req.params.id, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})
server.put('/favourites/.*', (req, res) => {
	persist.updaterating(req.params.id,req.params.rating, (err, data) => {
		if (err) {
			res.send(err)
		}		else {
			res.send(data)
		}
	})
})
const port = process.env.PORT || defaultPort

server.listen(port, function(err) {
	if (err) {
		console.error(err)
	}	else {
		console.log('App is ready at : ' + port)
	}
})
