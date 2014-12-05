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
        return module.exports.constructTree(messages);
      })
      .fail(function (error) {
        next(error);
      });
  },

  //adds message to db
  ////@params [Object (message, parentID)]
  addNewMessage: function (messageObject, callback) {

    var newMessage = {

      message: messageObject.message,
      parentID: messageObject.parentID,
      childrenID: []

    };

    var createMessage = Q.nbind(Message.create, Message);

    createMessage(newMessage)
    .then(function(createdMessage) {

      //finds parent and appends new messageID to childrenID array
      Message.findOne({_id: createdMessage.parentID }, function(err, foundParent) {

        if (foundParent) {

          foundParent.childrenID.push(createdMessage._id);
          foundParent.save();

        }

        // for testing purposes
        // if (callback) {
        //   callback(createdMessage);
        // }

      })

    });

  },

  //creates array of messages + direct children
  constructTree: function(arrayOfMessages) {

    var messages = [];

    // pushes roots to array
    arrayOfMessages.forEach(function(message) {

      message.children = []

      message.childrenID.forEach(function(childID) {

        //checks entire message array for matching childID
        arrayOfMessages.forEach(function(messageToCompare) {

          if (messageToCompare._id.equals(childID)) {
            message.children.push(messageToCompare);
          }

        });

      });

      messages.push(message);

    });

    return messages;

  }

};
