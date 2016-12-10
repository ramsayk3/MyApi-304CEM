'use strict'
const persist = require('../modules/persistence')
xdescribe('Persistence Module Testing', function () {
    it('Show By ID', function (done) {
        persist.showFavouritebyid('tt0120363', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            done()
        })
    })
    it('Show By ID Error', function (done) {
        persist.showFavouritebyid('tt0120', function (err, searchResult) {
            expect(err).toBe(err)
            done()
        })
    })
    it('Remove Film', function (done) {
        persist.remove('tt1233227', function (err, searchResult) {
            expect(err).toBe(null)
            done()
        })
    })
    it('Remove Film Error', function (done) {
        persist.remove('', function (err, searchResult) {
            expect(err).toBe(err)
            done()
        })
    })
    it('Update Rating', function (done) {
        persist.updaterating('tt0120363', 5, function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            done()
        })
    })
    it('Update Rating Error', function (done) {
        persist.updaterating('', 5, function (err, searchResult) {
            expect(err).toBe(err)
            done()
        })
    })
    xit('Should return favourites', function (done) {
        persist.showFavourites('', function (err, searchResult) {
            expect(err).toBe(null)
            done()
        })
    })
    xit('Should return favourites', function (done) {
        persist.showFavourites(123, function (err, searchResult) {
            expect(err).toBe(null)
            done()
        })
    })
})