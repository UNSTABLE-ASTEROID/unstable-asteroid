'use strict';

module.exports = {

  response: function() {
    this._ended = false;
    this._responseCode = null;
    this._header = null;
    this._data = null;

    this.writeHead = function(responseCode, headers) {
      this._responseCode = responseCode;
      this._header = headers;
    }.bind(this);

    this.end = function(data) {
      this._ended = true;
      this._data = data;
    }.bind(this);

  },

  request: function(url, method, postData) {
    this.url = url;
    this.method = method;
    this.body = postData;
    this._postData = postData;

    this.setEncoding = function() {
      this.addListener = this.on = function(type, callback) {
        if (type == 'data') {
          callback(JSON.stringify(this._postData));
        }

        if (type == 'end') {
          callback();
        }
      }.bind(this);

    }



  }

};