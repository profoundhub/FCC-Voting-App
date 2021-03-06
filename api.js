'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var app = express();

if (process.env.NODE_ENV === 'development') {
	require('dotenv').load();
}

require('./app/config/passport')(passport);
var config = require('./app/config/_config.js');

mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err, res) {
	if(err) {
		console.log('Error connecting to the database. ' + err);
	} else {
		console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
	}
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// there is really only one session, which is managed by Express.
// Passport merely piggy backs off the ExpressJS session to store data for authenticated users.
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true, // don't create session until something stored
	name: 'sessionId', // don't save session if unmodified
	// using store session on MongoDB using express-session + connect
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		url: config.mongoURI[process.env.NODE_ENV],
		collection: 'sessions',
		touchAfter: 24 * 3600 // time period in seconds
	})
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);
app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
	console.log(app.settings.env + ' server listening on port ' + app.get('port') + '...');
});

// for testing purposes.
module.exports = app;
