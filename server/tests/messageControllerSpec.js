'use strict';

var messageController = require('../messages/messageController'),
    Message = require('../messages/messageModel'),
    expect = require('chai').expect,
    mongoose = require('mongoose'),
    Q = require('q');

mongoose.connect('mongodb://MongoLab-d:tsWFfWiQkrxfZhKZbNOBPVGp3culnVTNs5G7nyd1cbE-@ds050077.mongolab.com:50077/MongoLab-d');
// mongoose.connect('mongodb://127.0.0.1/test');

describe('MessageController Test', function() {

  beforeEach(function(done) {
    Message.remove(done);
  });

  // afterEach(function(done) {
  //   Message.remove(done);
  // });

  xit('should add message to array', function(done) {
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
      },
      test3 = {
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
            messageController.getFullMessageTree(function(data) {
              expect(data).to.have.length.above(3);
              done();
            });
          });
        });
      });
    });
  });

  xit('should clone a message', function(done) {
    messageController.find({}, function(message) {
      var clone = messageController.cloneMessage(message);
      expect(clone.message).to.eql(message.message);
      done();
    })

  });

});

describe('it should work', function() {

  it('should return constructed tree', function(done) {
    messageController.getFullMessageTree(function(messages) {
      expect(messages).to.have.length(1);
      done();
    });
  });

});