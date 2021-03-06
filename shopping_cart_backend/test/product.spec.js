let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let prod = require('../routes/products');
const { response } = require('express');

//Assertion Style
let should = chai.should();

chai.use(chaiHttp);

   describe("GET/api/products",() =>{
       it("It should get all products", (done) => {
           chai.request('http://localhost:8000/api')
           .get("/products")
           .end((err,response) => {
               response.should.have.status(200);
               response.body.should.be.a('array');
            done();
           })
       })
   })

   describe("GET/api/product",() =>{
    it("It should not get all products", (done) => {
        chai.request('http://localhost:8000/api')
        .get("/product")
        .end((err,response) => {
            response.should.have.status(404);
      done();
        })
    })
})

   describe("GET product by id",() =>{
       it("It should get single product",(done) =>{
           chai.request('http://localhost:8000/api')
           .get("/product/5f4cf2145c1a0dbe4c8a835e")
           .end((err,response) =>{
               response.should.have.status(200);
               response.body.should.be.a('Object');
               response.body.should.have.property('_id');
               response.body.should.have.property('name').eq('One Plus 8');
               response.body.should.have.property('price');
               response.body.should.have.property('quantity');
               done();
           })
       })
   })

   