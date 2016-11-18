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
    var newPoll1 = new Poll({
      id: uuid.v1(),
      title: 'Do you prefer Trump or Clinton?',
      author: 'Seb',
      options: [{ title: 'Clinton' }, { title: 'Trump' }]
    });
    var newPoll2 = new Poll({
      id: uuid.v1(),
      title: 'Red or Blue?',
      author: 'Seb',
      options: [{ title: 'Red' }, { title: 'Blue' }]
    });
    newPoll1.save(function(err, poll1){
      newPoll2.save(function(err, poll2){
        done();
      });
    });
  });

  afterEach(function(done){
    Poll.collection.drop();
    done();
  });

  describe('GET /api/polls', function() {
    it('should list all polls on /api/polls GET', function(done) {
      chai.request(server)
      .get('/api/polls')
      .send({})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(2);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('author');
        res.body[0].should.have.property('options');
        res.body[0].title.should.equal('Do you prefer Trump or Clinton?')
        res.body[0].author.should.equal('Seb')
        res.body[0].options.should.be.a('array');
        res.body[0].options.length.should.be.equal(2);
        res.body[0].options[0].should.be.a('object');
        res.body[0].options[0].should.have.property('title')
        res.body[0].options[0].should.have.property('votes')
        res.body[0].options[0].title.should.equal('Clinton')
        res.body[0].options[0].votes.should.equal(0);
        done();
      });
    })
  });

  describe('/GET polls/:id', function() {

  });

});
