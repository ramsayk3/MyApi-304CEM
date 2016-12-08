const frisby = require('frisby')
const port = 8080

/*frisby.create('Post Movie To Favourites')
  .post('http://localhost:' + port + '/favourites?i=tt0435761', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  Title: 'Toy Story 3',
  Year: 2010
  })
 .toss()
 */

frisby.create('Get Movie By Specific ImdbID')
  .get('http://localhost:' + port + '/movie?i=tt0114709', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
   Title: 'Toy Story',
   Year: '1995'
  })
 .toss()

frisby.create('Search Omdb Database')
  .get('http://localhost:' + port + '/search?s=Toy%20Story', { strictSSL: false })
    .expectStatus(200)
 .expectJSON('Search', [{
  Title: 'Toy Story',
  Year: '1995'
  }])
 .toss()

frisby.create('Is There Data In My Database')
  .get('http://localhost:' + port + '/favourites', { strictSSL: false })
    .expectStatus(200)
 .expectJSON([{
  Title: 'Toy Story 2',
  Year: 1999
  }])
 .toss()

frisby.create('Get Data From My Database')
  .get('http://localhost:8080/favourites/tt0120363', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  Title: 'Toy Story 2',
  Year: 1999
  })
 .toss()

/*frisby.create('Get Data From My Database')
 .put('http://localhost:8080/favourites/id=tt0120363&rating=9.9', { strictSSL: false })
    .expectStatus(200)
 .expectJSON([{
  Title: 'Toy Story 2',
  Year: 1999,
imdbRating: 9.9
  }])
 .toss()
 */


/*frisby.create('Delete Data From My Database')
  .delete('http://localhost:8080/favourites/:id?id=tt0120366', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  ok: 1
  })
 .toss()
 */

