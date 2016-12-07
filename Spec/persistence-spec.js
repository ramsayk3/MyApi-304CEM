'use strict'
const persist = require('../modules/persistence')

describe('Persistence Module Testing', function (){
    it('Should return favourites',function (done){
        persist.showFavourites('',function (err, searchResult){
        expect(err).toBe(null)
        done()  
        })
    })
    it('Should return toy story 2',function (done){
        persist.showFavouritebyid('tt0120363',function (err, searchResult){
        expect(err).toBe(null)
        expect(searchResult.Title).toBe('Toy Story 2')
        done()  
        })
    })
})