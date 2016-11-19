'use strict';

var shortid = require('shortid');

var Poll = require('../models/polls.js');
var User = require('../models/users.js');

function getPolls(req, res) {

    var user = req.user._id;
    User
      .findOne({ '_id': user })
      .populate('polls')
      .exec(function(err, user){
        if(err) throw err;

        res.json(user.polls);
      });
};
function addPolls(req, res) {

  var user = req.user;
  var poll = req.body;

  // Warning: fill author property with github username.
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
};
function getPoll(req, res) {
  var poll_id = req.params.poll_id;

  Poll.findOne({ id: poll_id }, function(err, poll) {
    if(err) throw err;

    res.json(poll);
  });
};
function deletePoll(req, res) {
  var poll_id = req.params.poll_id;

  res.status(204);
};

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls,
  getPoll: getPoll,
  deletePoll: deletePoll,
};
