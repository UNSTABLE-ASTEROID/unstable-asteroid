'use strict';

var Message = require('./messageModel'),
    Q       = require('q');


/**
 * [contains helper function to add messages to tree and fetch entire tree]
 * @type {Object}
 */
module.exports = {

  //returns array of all messages on db
  getFullMessageTree: function(req, res, next) {

    var getMessageTree = Q.nbind(Message.find, Message);

    getMessageTree({})
      .then(function (messages) {
        res.json(messages);
      })
      .fail(function (error) {
        next(error);
      });
  },

  //adds message to db
  addNewMessage: function (req, res, next) {

    var newMessage = req.body;
    var createMessage = Q.nbind(Message.create, Message);

    createMessage(newMessage)
    .then(function(createdMessage) {
      res.json(createdMessage);
    });

  }

};
