'use strict';

module.exports = AbstractSkiffTransport;

function AbstractSkiffTransport() {
}

var AST = AbstractSkiffTransport.prototype;

AST.connect = function connect(localNodeId, remoteAddress) {
  if (!localNodeId) {
    throw new Error('need localNodeId');
  }
  if (!remoteAddress) {
    throw new Error('need remoteAddress');
  }

  return this._connect(localNodeId, remoteAddress);
};

AST._connect = notImplemented;

AST.listen = function listen(localNodeId, options, callback) {
  if (!localNodeId) {
    throw new Error('need localNodeId');
  }
  if (!options) {
    throw new Error('need options');
  }

  if (typeof callback != 'function') {
    throw new Error('callback required');
  }

  this._listen(localNodeId, options, callback);
};

AST._listen = notImplemented;

function notImplemented() {
  throw new Error('Not implemented');
}
