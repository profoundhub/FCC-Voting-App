process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var uuid = require('node-uuid');

var server = require('../../server');
var Poll = require('../models/polls');

var should = chai.should();
chai.use(chaiHttp);

describe('Polls', function() {

  Poll.collection.drop();

  // before each test case, the database is cleared and a new blob is added;
  // then, after each test, the database is cleared before the next test case is ran.
  beforeEach(function(done) {
    var newPoll = new Poll({
      id: uuid.v1(),
      title: 'Do you prefer Trump or Clinton?',
      author: 'Seb',
      options: ['option #1', 'option #2']
    });
    newPoll.save(function(err, poll){
      done();
    });
  });

  afterEach(function(done){
    Poll.collection.drop();
    done();
  });

  describe('/GET all books', function() {
    it('should list all polls on /api/polls GET', function(done) {
      chai.request(server)
      .get('/api/polls')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('options');
        res.body[0].title.should.equal('Do you prefer Trump or Clinton?')
        res.body[0].author.should.equal('Seb')
        res.body[0].options.should.be.a('array');
        res.body[0].options[0].should.equal('option #1')
        res.body[0].options[1].should.equal('option #2')
        done();
      });
    })
  });


});
