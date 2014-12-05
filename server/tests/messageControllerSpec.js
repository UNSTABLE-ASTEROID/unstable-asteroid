'use strict';

var messageController = require('../messages/messageController'),
    Message = require('../messages/messageModel'),
    expect = require('chai').expect,
    mongoose = require('mongoose'),
    Q = require('q');

mongoose.connect('mongodb://127.0.0.1/test');

describe('MessageController Test', function() {

  beforeEach(function(done) {

    Message.remove(done);

  });

  it('should add message to array', function(done) {

    var test = {
        message: "Test",
        parentID: null
    };

    messageController.addNewMessage(test, function(createdMessage) {

      Message.find({}, function(err, foundMessages) {

        expect(foundMessages[0].message).to.eql("Test");
        done();

      });

    })

  });

  it('should get array of messages from server', function(done) {

    var test1 = {
      message: 'Test1',
      parentID: null
    };

    messageController.addNewMessage(test1, function(createdMessage1) {

      var test2 = {
        message: 'Test2',
        parentID: createdMessage1._id
      };

      var test3 = {
        message: 'Test3',
        parentID: createdMessage1._id
      };

      messageController.addNewMessage(test2, function(createdMessage2) {

        messageController.addNewMessage(test3, function(createdMessage3) {

          var test4 = {
            message: 'Test4',
            parentID: createdMessage2._id
          };

          messageController.addNewMessage(test4, function(createdMessage4) {

            var messageTree = messageController.getFullMessageTree();

            console.log(messageTree);
            expect(messageTree).to.eql(messageTree);
            done();

          });

        });


      })


    });


  });




});