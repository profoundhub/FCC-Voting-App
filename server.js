var express = require('express');
var api = require('./app/routes/api');
var cli = require('./app/routes/cli');
var auth = require('./app/routes/auth');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/client'));

// views is directory for all template files
app.set('views', __dirname + '/client');

// app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

// api routes
app.use('/auth', auth);

// api routes
app.use('/api', api);

// fonrt end serving
app.use('/app', cli);

// server listener
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
