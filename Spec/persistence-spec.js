'use strict'
const persist = require('../modules/persistence')

describe('Persistence Module Testing', function (){
    it('Should return favourites',function (done){
        persist.showFavourites('',function (err, searchResult){
        expect(err).toBe(null)
        done()  
        })
    })
})