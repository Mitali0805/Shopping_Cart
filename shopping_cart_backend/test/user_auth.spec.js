let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const { response } = require('express');
const { request } = require('chai');
let should = chai.should();

chai.use(chaiHttp);

describe('signin function',() =>{
    it('test signin successful',(done) =>{
        let user = {
            email: 'neha@gmail.com',
            password: 'neha123'
        }

       // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzk0YWFiMGUxZjZhZWNiOTE1ZjgiLCJpYXQiOjE1OTkxNDA4OTZ9.1iMGbbdwLzjLxPPnqaAxTpTZbBN9ldP7_KA4cAplU_E'

        chai.request('http://localhost:8000/api')
        .post('/signin')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        //.set('Authorization','Bearer'+''+token)
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.be.a('Object');
       done();     
        })
    });

    it('test signin of authorized user with wrong password',(done) =>{
        let user = {
            email: 'neha@gmail.com',
            password: 'neha456'
        }

        //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUwNzk0YWFiMGUxZjZhZWNiOTE1ZjgiLCJpYXQiOjE1OTkxNDA4OTZ9.1iMGbbdwLzjLxPPnqaAxTpTZbBN9ldP7_KA4cAplU_E'

        chai.request('http://localhost:8000/api')
        .post('/signin')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        //.set('Authorization','Bearer'+''+token)
        .end((err,response) =>{
            response.should.have.status(401);
            response.body.should.be.a('Object');
       done();     
        })
    });

    it('test signin for unregistered user',(done) =>{
        let user = {
            email: 'test@gmail.com',
            password: 'test123'
        }

        chai.request('http://localhost:8000/api')
        .post('/signin')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .end((err,response) =>{
            response.should.have.status(400);
            response.body.should.be.a('Object');
       done();     
        })
    })
})


describe('signup function',() =>{
    it('test signup successful',(done) =>{
        let user = {
            name:'Sumedha',
            email: 'sumedha1@gmail.com',
            password: 'sumedha4',
            mobile: 9498563214
        }


        chai.request('http://localhost:8000/api')
        .post('/signup')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .end((err,response) =>{
            response.should.have.status(200);
            response.body.should.be.a('Object');
       done();     
        })
    });

    it('test signup for empty body',(done) =>{
        let user ={}
        chai.request('http://localhost:8000/api')
        .post('/signup')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .end((err,response) =>{
            response.should.have.status(400);
            response.body.should.be.a('Object');
       done();     
        })
    });

    it('test signup for already registered email',(done) =>{
        let user = {
            name:'Sumedha',
            email: 'sumedha@gmail.com',
            password: 'sumedha4',
            mobile: 9498563214
        }

        chai.request('http://localhost:8000/api')
        .post('/signup')
        .send(user)
        .set('Content-Type','application/json')
        .set('Accept','application/json')
        .end((err,response) =>{
            response.should.have.status(403);
            response.body.should.be.a('Object');
       done();     
        })
    })


})






      
