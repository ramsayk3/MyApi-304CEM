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
        film.getMovie('','', '', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
            done()
        })
    })
    xit('Should add star wars to my db', function (done) {
        film.addMovie('tt0387563', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.__v).toBe(0)
            expect(searchResult.Title).toBe("Saving 'Star Wars'")
            expect(searchResult.Year).toBe(2004)
            done()
        })
    })
    
})