describe("movie search", function(){
    
    describe("GET /search", function(){
      xit("returns movie titles", function(){
          
          request.get(base_url, function(error, response, body){
              expect(response.statusCode).toBe(200);
              done();
          })
      })  
    })
})