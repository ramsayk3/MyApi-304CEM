'use strict'
const persist = require('../modules/persistence')
const bad = 500
const ratingTest = 5


describe('Persistence Module Testing', function() {
	it('Should Return Movie By ID', function(done) {
		persist.showFavouritebyid('tt0120363', function(err, searchResult) {
			expect(err).toBe(null)
			expect(searchResult.Title).toBe('Toy Story 2')
			done()
		})
	})
	it('Should Return Error As !DB', function(done) {
		persist.showFavouritebyid('tt0120399', function(err) {
			expect(err.message).toBe('Id Not In Database')
			expect(bad)
			done()
		})
	})
	it('Should Return Error As Invalid ID', function(done) {
		persist.showFavouritebyid('',function(err) {
			expect(err.message).toBe('Id Not In Database')
			expect(bad)
			done()
		})
	})
	it('Should Update Movie Rating', function(done) {
		persist.updaterating('tt0120363', ratingTest, function(err, searchResult) {
			expect(err).toBe(null)
			expect(searchResult.Title).toBe('Toy Story 2')
			done()
		})
	})
	it('Should Fail To Update As !DB', function(done) {
		persist.updaterating('tt0120399', ratingTest, function(err) {
			expect(err.message).toBe('Not in Database')
			expect(bad)
			done()
		})
	})
	it('Should Fail To Update As Invalid ID', function(done) {
		persist.updaterating(undefined, ratingTest, function(err) {
			expect(err.message).toBe('Pass a valid id')
			expect(bad)
			done()
		})
	})
	it('Should Return Movies In Favourites', function(done) {
		persist.showFavourites(function(err, searchResult) {
			expect(err).toBe(null)
			expect(searchResult[0].Title).toBe('Toy Story 2')
			done()
		})
	})
	it('Should Remove Film From DB', function(done) {
		persist.remove('tt0385705', function(err) {
			expect(err).toBe(null)
			done()
		})
	})
	it('Should Fail To Remove Film As Invalid ID', function(done) {
		persist.remove('', function(err) {
			expect(err.message).toBe('Pass a valid id')
			done()
		})
	})
})
