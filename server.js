'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
require('dotenv').load();
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

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/common', express.static(process.cwd() + '/app/common'));

if(process.env.mode === 'development') {
	app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// there is really only one session, which is managed by Express.
// Passport merely piggy backs off the ExpressJS session to store data for authenticated users.
app.use(session({
	secret: 'secretClementine4VotingApp390',
	resave: false,
	saveUninitialized: true,
	name: 'sessionId',
	// using store session on MongoDB using express-session + connect
	store: new MongoStore({
		url: config.mongoURI[process.env.NODE_ENV],
		collection: 'sessions'
	})
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log(app.settings.env + ' server listening on port ' + port + '...');
});

// for testing purposes.
module.exports = app;
