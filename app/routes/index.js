'use strict';

var path = process.cwd();
var userController = require(path + '/app/controllers/userController.js');
var Poll = require('../models/polls.js');
var User = require('../models/users.js');

module.exports = function (app, passport) {

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
};
