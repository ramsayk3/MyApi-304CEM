const frisby = require('frisby')
const port = 8080

frisby.create('Post Movie')
  .post('http://localhost:' + port + '/favourites?i=tt0435761', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  Title: 'Toy Story 3',
  Year: 2010
  })
 .toss()

frisby.create('Post Movie - Error')
  .post('http://localhost:' + port + '/favourites?i=', { strictSSL: false })
    .expectStatus(500)
 .expectJSON({
  message: "movie not found"
  })
 .toss()
 

frisby.create('Get Movie From omdb By ID')
  .get('http://localhost:' + port + '/movie?i=tt0114709', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
   Title: 'Toy Story',
   Year: '1995'
  })
 .toss()

frisby.create('Get Movie From omdb By ID - Error')
  .get('http://localhost:' + port + '/movie?i=', { strictSSL: false })
    .expectStatus(500)
 .expectJSON({
   message: "null"
  })
 .toss()

frisby.create('Search omdb')
  .get('http://localhost:' + port + '/search?s=Toy%20Story', { strictSSL: false })
    .expectStatus(200)
 .expectJSON('Search', [{
  Title: 'Toy Story',
  Year: '1995'
  }])
 .toss()

frisby.create('Search omdb Error')
  .get('http://localhost:' + port + '/search?s=', { strictSSL: false })
    .expectStatus(500)
 .expectJSON({
  message: "null"
  })
 .toss()


frisby.create('Retrieve Favourites List')
  .get('http://localhost:' + port + '/favourites', { strictSSL: false })
    .expectStatus(200)
 .expectJSON([{
  Title: 'Toy Story 2',
  Year: 1999
  }])
 .toss()

/*frisby.create('Database Error')
  .get('http://localhost:' + port + '/favourites', { strictSSL: false })
    .expectStatus(200)
 .expectJSON([{
  Title: 'Toy Story 2',
  Year: 1999
  }])
 .toss()
 */

frisby.create('Search By imdbId In Favourites')
  .get('http://localhost:8080/favourites/tt0435761', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  Title: 'Toy Story 3',
  Year: 2010
  })
 .toss()

frisby.create('Search By imdbId In Favourites - Error')
  .get('http://localhost:8080/favourites/:id?id=t', { strictSSL: false })
    .expectStatus(500)
 .expectJSON({
  message: 'Id Not In Database'
  })
 .toss()

frisby.create('Update Rating For Movie')
 .put('http://localhost:8080/favourites/?id=tt0435761&rating=9.9', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  Title: 'Toy Story 3',
  Year: 2010
  })
 .toss()

frisby.create('Update Rating For Movie - Error')
 .put('http://localhost:8080/favourites/?id=&rating=9.9', { strictSSL: false })
    .expectStatus(500)
 .expectJSON({
  message: "Pass a valid id"
  })
 .toss()

frisby.create('Delete Movie From Favourites - Error')
  .delete('http://localhost:8080/favourites/?id=', { strictSSL: false })
    .expectStatus(500)
  .expectJSON({
   message: "Pass a valid id"
  })
 .toss()

frisby.create('Delete Movie From Favourites')
  .delete('http://localhost:8080/favourites/?id=tt0435761', { strictSSL: false })
    .expectStatus(200)
 .expectJSON({
  ok: 1
  })
 .toss()


 

