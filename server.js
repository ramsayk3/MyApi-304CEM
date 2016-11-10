'use strict'
const restify = require('restify')
const server = restify.createServer()
const omdb = require('./modules/film')

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.authorizationParser())

const defaultPort = 8080

server.get('/?n=:name', function(req, res, next) {
    const movieName = req.params.name;
    console.log(req.params)
    omdb.GetMovie(movieName, '2003', function(err, result){
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