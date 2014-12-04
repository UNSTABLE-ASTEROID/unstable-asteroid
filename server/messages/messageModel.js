'use strict';

var mongoose = require('mongoose');

//creates schema for messages with properties message, parentID, and childrenID
//unqiue _id created by default
var MessageSchema = new mongoose.Schema({

  message: String,
  parentID: Number,
  childrenID: [Number]

});

module.exports = mongoose.model('Message', MessageSchema);