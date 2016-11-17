'use strict'
const restify = require('restify')
const server = restify.createServer()
const omdb = require('./modules/film')

server.use(restify.queryParser())
server.use(restify.bodyParser())
server.use(restify.acceptParser(server.acceptable))

const defaultPort = 8080

server.get('/', function(req, res, next) {
    console.log(req.params.n)
    omdb.GetMovie(req.params.n, req.params.y, function(err, result){
        if(err){
            console.log(err)
        }else{
            res.send(result)
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