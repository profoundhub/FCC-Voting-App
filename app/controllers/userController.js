
var Polls = require('../models/polls.js')

function getPolls(req, res) {
  res.json({"foo": "bar"});
}

function addPolls(req, res) {

}

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls
};
