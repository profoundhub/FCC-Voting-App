var express = require('express');
var cli = express.Router()

cli.route('/*').get(function(req, res) {
  res.render('login');
});

module.exports = cli;
