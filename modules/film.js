const request = require("request");


exports.SearchMovie = function(movieSearch, callback) {
    const search = { method: 'GET',
        url: 'http://www.omdbapi.com/',
        qs: { s: movieSearch, r: 'json' },
    }
  request(search, function (error, response, body) {
        if (error) throw new Error(error);
        return callback(null, JSON.parse(body));
  })
};

exports.GetMovie = function(input, type, year, callback){
    request(`http://www.omdbapi.com/?${type}=${input}&y=${year}`,
            function (error, response, body) {
        if (error) throw new Error(error);
        return callback(null, JSON.parse(body))
    })
}

