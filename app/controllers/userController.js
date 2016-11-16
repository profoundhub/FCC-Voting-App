
var Polls = require('../models/polls.js')

function getPolls(req, res) {
  
  res.json(req.user._id);
}

function addPolls(req, res) {

}

module.exports = {
  getPolls: getPolls,
  addPolls: addPolls
};
