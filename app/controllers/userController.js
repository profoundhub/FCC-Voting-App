'use strict';

var shortid = require('shortid');

var Poll = require('../models/polls.js');
var User = require('../models/users.js');

function getPolls(req, res) {

  var user = req.user;
  var polls_ids_array = req.user.polls;
  var polls = [];

  polls_ids_array.forEach(function(id, i) {

    Poll.find({ _id: id }, function(err, poll){
      if(err) throw err;

      polls.push(poll);

      if((polls_ids_array.length === i+1) && (polls_ids_array.length === 0)) {
        res.json(polls);
      }

    });
  });
}

function addPolls(req, res) {

  var user = req.user;
  var poll = req.body;

  var newPoll = new Poll({
    id: shortid.generate(),
    title: poll.title,
    author: user.author.github.username,
    options: poll.options
  });

  newPoll.save(function(err, poll){
    if (err) throw err;

    User.findById(user._id, function(err, user){
      if (err) throw err;

      user.polls.push(poll.id);

      user.save(function(err, userUpdated){
        if (err) throw err;

        res.json(poll.id);
      });

    });

  });
}

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls
};
