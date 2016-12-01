'use strict'
const film = require('../modules/film')
describe('Film Module Testing', function () {
    xit('should search skyfall', function (done) {
        film.searchMovie('skyfall', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Search[0].Title).toBe('Skyfall')
            expect(searchResult.Search[0].imdbID).toBe('tt1074638')
            done()
        })
    })
    xit('Should return an error', function (done) {
        film.searchMovie('', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
            done()
        })
    })
    xit('Should return toy story 2', function (done) {
        film.getMovie('tt0120363','i', '1999', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            expect(searchResult.Year).toBe('1999')
            done()
        })
    })
    xit('Should return an error', function (done) {
        film.getMovie('','', '', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
            done()
        })
    })
    
})