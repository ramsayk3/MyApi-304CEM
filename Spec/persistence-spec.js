'use strict'
const persist = require('../modules/persistence')

describe('Persistence Module Testing', function () {
    it('Should Return Movie By ID', function (done) {
        persist.showFavouritebyid('tt0120363', function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            done()
        })
    })
    it('Should Return Error As !DB', function (done) {
        persist.showFavouritebyid('tt0120399', function (err, searchResult) {
            expect(err.message).toBe("Id Not In Database")
            expect(500)
            done()
        })
    })
    it('Should Return Error As Invalid ID', function (done) {
        persist.showFavouritebyid('t', function (err, searchResult) {
            expect(err).toBe(err)
            expect(500)
            done()
        })
    })
    it('Should Update Movie Rating', function (done) {
        persist.updaterating('tt0120363', 8, function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult.Title).toBe('Toy Story 2')
            done()
        })
    })
    it('Should Fail To Update As !DB', function (done) {
        persist.updaterating('tt0120399', 5, function (err, searchResult) {
            expect(err.message).toBe("Not in Database")
            expect(500)
            done()
        })
    })
    it('Should Fail To Update As Invalid ID', function (done) {
        persist.updaterating('', 5, function (err, searchResult) {
            expect(err.message).toBe('Pass a valid id')
            expect(500)
            done()
        })
    })
    it('Should Return Movies In Favourites', function (done) {
        persist.showFavourites(function (err, searchResult) {
            expect(err).toBe(null)
            expect(searchResult[0].Title).toBe('Toy Story 2')
            done()
        })
    })
    it('Should Remove Film From DB', function (done) {
        persist.remove('tt0385705', function (err, searchResult) {
            expect(err).toBe(null)
            done()
        })
    })
    it('Should Fail To Remove Film As Invalid ID', function (done) {
        persist.remove('', function (err, searchResult) {
            expect(err.message).toBe('Pass a valid id')
            done()
        })
    })
})