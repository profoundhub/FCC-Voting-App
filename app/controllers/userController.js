'use strict';

var Poll = require('../models/polls.js');
var User = require('../models/users.js');

/**
* Get auth's polls.
* @returns {Array} polls
*/
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

/**
* Add poll to auth's polls array.
* @returns {String} poll's id
*/
function addPolls(req, res) {

  var user = req.user;
  var poll = req.body;

  // Warning: fill author property with github username.
  var newPoll = new Poll({
    title: poll.title,
    author: user.author.github.username,
    options: poll.options
  });

  newPoll.save(function(err, poll){
    if (err) throw err;

    User.findById(user._id, function(err, user){
      if (err) throw err;

      user.polls.push(poll._id);

      user.save(function(err, userUpdated){
        if (err) throw err;

        res.json(poll._id);
      });

    });

  });
};

/**
* Get poll.
* @param {String} poll's id
* @returns {object} poll
*/
function getPoll(req, res) {
  var poll_id = req.params.poll_id;

  Poll.findOne({ _id: poll_id }, function(err, poll) {
    if(err) throw err;

    res.json(poll);
  });
};

/**
* Delete a auth's poll.
* @param {String} poll's id
* @returns {undefined}
*/
function deletePoll(req, res) {
  var poll_id = req.params.poll_id;
  var user = req.user;

  Poll.remove({ _id: poll_id }, function(err, pollRemoved) {
    if(err) throw err;

    user.polls = user.polls.filter(function(poll) {
      return poll._id !== pollRemoved._id;
    });

    user.save(function(err, userPollsUpdated) {
      if(err) throw err;

      res.status(204);
    });

  });
};

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls,
  getPoll: getPoll,
  deletePoll: deletePoll,
};
