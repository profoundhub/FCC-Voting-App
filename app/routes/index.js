'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var userController = require(path + '/app/controllers/userController.js');
var Poll = require('../models/polls.js');
var User = require('../models/users.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {

			res.sendFile(path + '/client/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			console.log(req.session);
			res.sendFile(path + '/client/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/client/profile.html');
		});

	app.route('/api/profile')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

	app.route('/api/polls')
		.get(isLoggedIn, userController.getPolls)
		.post(isLoggedIn, userController.addPolls);

	// don't use this route.
	app.route('/dangerousroutepopulatepolls')
	 .get(isLoggedIn, function(req, res) {
			var i = Math.floor((Math.random() * 100) + 1);
			var newPoll = new Poll({
				title: 'Poll #' + i,
				author: 'zelol',
				options: [{ title: 'option #1' }, { title: 'options #2' } ]
			})
			newPoll.save(function(err, poll) {
				if(err) throw err;

				var user = req.user;
				user.polls.push(poll._id);

				user.save(function(err, user) {
					res.json(user);
				});

			});
		});


	app.route('/api/polls/:poll_id')
		.get(isLoggedIn, userController.getPoll)
		.delete(isLoggedIn, userController.deletePoll)

};
