'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Poll = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  author: { type: String, required: true },
  options: [{ title: String, votes: { type: Number, default: 0 } }]
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Poll', Poll)
