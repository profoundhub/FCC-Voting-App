'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(express.bodyParser());

// there is really only one session, which is managed by Express.
// Passport merely piggy backs off the ExpressJS session to store data for authenticated users.
app.use(session({
	secret: 'secretClementine4VotingApp390',
	resave: false,
	saveUninitialized: true,
	name: 'sessionId'
}));

// initialize session after static files.
// cf: https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive, 'Avoid Sessions for Static Resources' section.
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
