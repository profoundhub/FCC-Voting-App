'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/common', express.static(process.cwd() + '/app/common'));
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;



app.use(session({
	secret: 'secretClementine4VotingApp390',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
