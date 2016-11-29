'use strict'
const restify = require('restify')
const server = restify.createServer()
const omdb = require('./modules/film')
const movieDb = require('../Schema/Schema')
const persist = require('./modules/persistence')

server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))

const defaultPort = 8080

server.get('/search', function(req, res, next) {
    console.log(req.params.s)
    omdb.searchMovie(req.params.s, function(err, result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

server.get('/movie', function(req, res, next) {
    let input
    let type
    if(req.params.n !== undefined){
        input = req.params.n
        type = 't'
    }
    else {
        input = req.params.i
        type = 'i'
    }
    omdb.getMovie(input, type, req.params.y, function(err, result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

server.post('/favourites', function (req, res, next) {
    console.log('adding ' + '' + req.params.i)
    omdb.addMovie(req.params.i, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            res.save(result)
        }
    })
})



const port = process.env.PORT || defaultPort
server.listen(port, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})