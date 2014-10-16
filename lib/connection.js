'use strict';

module.exports = AbstractSkiffConnection;

function AbstractSkiffConnection() {
}

var ASC = AbstractSkiffConnection.prototype;

ASC.send = function send(type, args, callback) {
  if (typeof type != 'string') {
    throw new Error('Need type');
  }
  if (typeof args != 'object') {
    throw new Error('Need args of type object');
  }
  if (typeof callback != 'function') {
    throw new Error('Need a callback of type function');
  }

  this._send(type, args, callback);
};

ASC._send = notImplemented;

ASC.receive = function receive(fn) {
  if (typeof fn != 'function') {
    throw new Error('Need a function as first argument');
  }

  this._receive(fn);
};

ASC._receive = notImplemented;

ASC.close = function close(callback) {
  this._close(callback);
};

ASC._close = notImplemented;

function notImplemented() {
  throw new Error('Not implemented');
}
