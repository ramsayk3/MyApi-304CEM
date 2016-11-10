const request = require("request");

exports.GetMovie = function(movieName, Year, callback){
    const options = { method: 'GET',
        url: 'http://www.omdbapi.com/',
        qs: { t: movieName, y: Year, plot: 'full', r: 'json' },
    }
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        return callback(null, JSON.parse(body))
    })
}

