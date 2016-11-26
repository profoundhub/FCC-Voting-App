var express = require('express');
var app = express();

app.set('port', (process.env.APP_PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');

app.get('*', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
