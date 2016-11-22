'use strict'
const film = require('../modules/film')

describe('film api', function (){
    it('should search skyfall', function(done){
        film.searchMovie('skyfall', function(err, searchResult){
            expect(err).toBe(null)
            expect(searchResult.Search[0].Title).toBe('Skyfall')
            expect(searchResult.Search[0].imdbID).toBe('tt1074638')
            done()
        })
    })
    
})

describe('film api', function (){
    it('Should return an error', function(done){
        film.searchMovie('', function(err, searchResult){
            expect(err).toBe(null)
            expect(searchResult.Response).toBe('False')
            expect(searchResult.Error).toContain('wrong')
            done()
        })
    })
    
})
