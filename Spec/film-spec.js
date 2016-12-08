'use strict'
const film = require('../modules/film')
describe('Film Module Testing', function () {
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
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
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
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
            done()
        })
    })
    it('Should add toy story 2 to my db', function (done) {
        film.addMovie('tt0120363', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            expect(searchResult.Year).toBe(1999)
            done()
        })
    })
    it('Should return undefined', function (done) {
        film.addMovie('', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Response).toBe(undefined)
            done()
        })
    })
    
})