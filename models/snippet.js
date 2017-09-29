const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  codeBody: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  tag: {
    type: String,
    required: false
  }
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
