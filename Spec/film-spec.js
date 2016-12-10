'use strict'
const film = require('../modules/film')

xdescribe('Film Module Testing', function () {
    it('should search skyfall', function (done) {
        film.searchMovie('skyfall', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Search[0].Title).toBe('Skyfall')
            expect(searchResult.Search[0].imdbID).toBe('tt1074638')
            done()
        })
    })
    it('Should return an error', function (done) {
        film.searchMovie('', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should return toy story 2', function (done) {
        film.getMovie('tt0120363','i', '1999', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            expect(searchResult.Year).toBe('1999')
            done()
        })
    })
    it('Should return an error', function (done) {
        film.getMovie('invalid','invalid', '1234', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should add film to my db', function (done) {
        film.addMovie('tt0385705', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('The Football Factory')
            expect(searchResult.Year).toBe(2004)
            done()
        })
    })
    it('Duplicate Error Test', function (done) {
        film.addMovie('tt0120363', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
    it('Should return error', function (done) {
        film.addMovie('', function (err, searchResult) {
            expect(err).toBe(err)
            expect(400)
            done()
        })
    })
})