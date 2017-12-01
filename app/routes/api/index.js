var express = require('express');
var api = express.Router();
var path = require('path');
var userController = require('../../controllers/userController.js');

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

api.route('/').get(function(req, res) {
  res.json({ test: "ok" });
});

api.route('/login')
  .get(function (req, res) {
    console.log(req.session);
    res.sendFile(path + '/client/login.html');
  });

api.route('/logout')
  .get(function (req, res) {
    req.logout();
    res.redirect('/login');
  });

api.route('/api/profile')
  .get(isLoggedIn, function (req, res) {
    res.json(req.user.github);
  });

api.route('/api/polls')
  .get(isLoggedIn, userController.getPolls)
  .post(isLoggedIn, userController.addPolls);

api.route('/api/polls/:poll_id')
  .get(isLoggedIn, userController.getPoll)
  .delete(isLoggedIn, userController.deletePoll)

module.exports = api;
