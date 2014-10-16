'use strict';

module.exports = AbstractSkiffTransport;

function AbstractSkiffTransport() {
}

var AST = AbstractSkiffTransport.prototype;

AST.connect = function connect(options) {
  if (!options) {
    throw new Error('need options');
  }

  return this._connect(options);
};

AST._connect = notImplemented;

AST.listen = function listen(options, callback) {
  if (!options) {
    throw new Error('need options');
  }

  if (typeof callback != 'function') {
    throw new Error('callback required');
  }

  this._listen(options, callback);
};

AST._listen = notImplemented;

function notImplemented() {
  throw new Error('Not implemented');
}
