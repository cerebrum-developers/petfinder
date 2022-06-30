var supertest = require("supertest");
// var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:9096");

// UNIT test begin

describe("home page test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      if(res.status === 200){
        console.log("case1=======>api host working");
      }else{
        console.log("case1=======>api host not working");

      }
      done();
    });
  });

});


describe("add animal api test",function(){

  // #1 should return error on empty params

  it("should return error on empty params",function(done){

    
    server
    .post('/animals/addAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 400){
        console.log("case1=======>api has no params");
      }else{
        console.log("case1=======>api host has params");

      }
     
      done();
    });
  });

  it("should return error on invalid request",function(done){

    
    server
    .get('/animals/addAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api is working properly");
      }else{
        console.log("case1=======>invalid api request.");

      }
     
      done();
    });
  });

  
});

describe("edit animal api test",function(){

  // #1 should return error on empty params

  it("should return error on empty params",function(done){

    
    server
    .post('/animals/editAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 400){
        console.log("case1=======>api has no params");
      }else{
        console.log("case1=======>api host has params");

      }
     
      done();
    });
  });

  it("should return error on invalid request",function(done){

   
    server
    .get('/animals/editAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api is working properly");
      }else{
        console.log("case1=======>invalid api request.");

      }
     
      done();
    });
  });

  it("should return error when no id is passed",function(done){

   
    server
    .get('/animals/editAnimal')
    .send({"name":"abcd"})
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api has valid id.");
      }else{
        console.log("case1=======>invalid data is passed.");

      }
     
      done();
    });
  });

  
});

describe("delete animal api test",function(){

  // #1 should return error on empty params

  it("should return error on empty params",function(done){

    
    server
    .post('/animals/deleteAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 400){
        console.log("case1=======>api has no params");
      }else{
        console.log("case1=======>api host has params");

      }
     
      done();
    });
  });

  it("should return error on invalid request",function(done){
    server
    .get('/animals/deleteAnimal')
    .send()
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api is working properly");
      }else{
        console.log("case1=======>invalid api request.");

      }
      done();
    });
  });

  it("should return error when no id is passed",function(done){

   
    server
    .get('/animals/deleteAnimal')
    .send({"is_deleted":1})
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api has valid id.");
      }else{
        console.log("case1=======>invalid data is passed.");
  
      }
     
      done();
    });
  });

  it("valid api test",function(done){
    server
    .post('/animals/deleteAnimal')
    .send({
      "animal_id" : "62bc384fa5827e83e26b84c6",
      "is_deleted" : 1
     })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api is working");
      }else{
        console.log("case1=======>invalid request.");

      }
     
      done();
    });
  });

  
});

describe("animal list api test",function(){

  // #1 should return error on empty params

  it("should return error on empty params",function(done){

    
    server
    .post('/animals/animalList')
    .send()
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 400){
        console.log("case1=======>api has no params");
      }else{
        console.log("case1=======>api host has params");

      }
     
      done();
    });
  });

  it("should return error on invalid request",function(done){
    server
    .post('/animals/animalList')
    .send()
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      console.log("status is"+res.status);
      if(res.status === 200){
        console.log("case1=======>api is working properly");
      }else{
        console.log("case1=======>invalid api request.");

      }
      done();
    });
  });

  
});





