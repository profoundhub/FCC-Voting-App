'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  title: String,
  link: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      name: String,
      votes: Number
    }
  ]
})

module.exports = mongoose.model('Poll', Poll)
