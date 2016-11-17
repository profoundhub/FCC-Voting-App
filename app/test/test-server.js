process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../../server');
var Poll = require('../models/polls');

var should = chai.should();
chai.use(chaiHttp);

describe('Polls', function() {

  Poll.collection.drop();

  it('should list all polls on /api/polls GET', function(done) {
    chai.request(server)
    .get('/api/polls')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  })
});
