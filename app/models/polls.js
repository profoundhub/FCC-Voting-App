'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  title: { type: String, unique: true },
  link: String,
  author: String,
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      name: String,
      message: String
    }
  ]
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Poll', Poll)
