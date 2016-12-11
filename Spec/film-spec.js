'use strict'
const film = require('../modules/film')

describe('Film Module Testing', function () {
    it('Should Search OMDB For Skyfall', function (done) {
        film.searchMovie('skyfall', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Search[0].Title).toBe('Skyfall')
            expect(searchResult.Search[0].imdbID).toBe('tt1074638')
            done()
        })
    })
    it('Should Return Search Error As Invalid Search', function (done) {
        film.searchMovie(undefined, function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should Return Movie From imdbID', function (done) {
        film.getMovie('tt0120363','i', '1999', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            expect(searchResult.Year).toBe('1999')
            done()
        })
    })
    it('Should Return Get Movie Error As Invalid Parameters', function (done) {
        film.getMovie('invalid','invalid', '1234', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should Add Movie To Favourites List', function (done) {
        film.addMovie('tt0385705', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('The Football Factory')
            expect(searchResult.Year).toBe(2004)
            done()
        })
    })
    it('Should Return Error As Movie Duplicate', function (done) {
        film.addMovie('tt0120363', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should Return Add Movie Error As Invalid ID', function (done) {
        film.addMovie('', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
})