'use strict';

var Poll = require('../models/polls.js');
var User = require('../models/users.js')

function getPolls(req, res) {

  //var userId = (req.user && req.user._id)  || '2';

  Poll.find({}, function(err, polls){
    if(err) throw err;

    res.json(polls);
  });

}

function addPolls(req, res) {

  var author_id = '582cc2fb1390c224a0e5ea38'; // this number is here for testing purpose.
  var author = 'test';
  var newPoll = new Poll({
    title: 'test',
    link: 'google.com',
    author: author,
    author_id: author_id
  });

  newPoll.save(function(err, poll){
    if (err) throw err;

    User.findById(author_id, function(err, user){
      if (err) throw err;

      user.polls.push(poll._id);

      user.save(function(err, userUpdated){
        if (err) throw err;

        res.json(userUpdated);
      });

    });

  });
}

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls
};
