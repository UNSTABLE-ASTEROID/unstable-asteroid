'use strict';

var messageController = require('../messages/messageController'),
    Message = require('../messages/messageModel'),
    expect = require('chai').expect,
    mongoose = require('mongoose'),
    Q = require('q'),
    stubs = require('./stubs');

mongoose.connect('mongodb://127.0.0.1/test');

describe('MessageController Test', function() {

  beforeEach(function(done) {

    Message.remove(done);

  });

  it('should add message to server', function(done) {

    var test = {
      message: "Test",
      parentID: 234,
      childrenID: 354
    };

    var req = new stubs.request('', 'POST', test);
    var res = new stubs.response();

    var testMessage = new Message(test);
    var addMessage = Q.nbind(messageController.addNewMessage, Message);

    addMessage(req, res)
    .then(function() {
      expect(res._data).to.eql(testMessage);
      done();
    });

  });

  it('should get array of messages from server', function(done) {

    var req = new stubs.request('', 'POST', test);
    var res = new stubs.response();

    var test = {
      message: "Test",
      parentID: 234,
      childrenID: [354]
    };

    Message.create(test, function(err) {
      Message.create(test, function(err) {
        messageController.getFullMessageTree(req, res);
      });
    });


  });




});