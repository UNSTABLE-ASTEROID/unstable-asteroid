'use strict';

var mongoose = require('mongoose');

//creates schema for messages with properties message, parentID, and childrenID
//unqiue _id created by default
var MessageSchema = new mongoose.Schema({

  message: String,
  parentID: ObjectID,
  childrenID: [ObjectID]

});

module.exports = mongoose.model('Message', MessageSchema);