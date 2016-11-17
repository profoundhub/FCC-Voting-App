'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  id: { type: String, require: true, unique: true },
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  options: [{ type: String, required: true }]
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Poll', Poll)
