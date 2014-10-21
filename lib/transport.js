'use strict';

var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var URL = require('url');

module.exports = AbstractSkiffTransport;

function AbstractSkiffTransport() {
  EventEmitter.call(this);
}

inherits(AbstractSkiffTransport, EventEmitter);

var AST = AbstractSkiffTransport.prototype;

AST._protocolName = notImplemented;

AST.connect = function connect(localNodeId, remoteAddress) {
  if (!localNodeId) {
    throw new Error('need localNodeId');
  }
  if (!remoteAddress) {
    throw new Error('need remoteAddress');
  }

  var remote = this._parseURL(remoteAddress);
  return this._connect(localNodeId, remote);
};

AST._parseURL = function _parseURL(url) {
  url = URL.parse(url);
  var expectedProtocol = this._protocolName();
  if (!url.protocol) {
    url.protocol = expectedProtocol + ':';
  }
  url.protocol = url.protocol.substring(0, url.protocol.length - 1);
  if (url.protocol != expectedProtocol) {
    throw new Error('unexpected protocol in remote URL:' + url.protocol);
  }
  if (url.port) {
    url.port = parseInt(url.port, 10);
  }

  return url;
};

AST._connect = notImplemented;

AST.listen = function listen(localNodeId, url, callback) {
  if (!localNodeId) {
    throw new Error('need localNodeId');
  }
  if (!url) {
    throw new Error('need url');
  }

  if (typeof callback != 'function') {
    throw new Error('callback required');
  }

  var listenURL = this._parseURL(url);

  this._listen(localNodeId, listenURL, callback);
};

AST._listen = notImplemented;

function notImplemented() {
  throw new Error('Not implemented');
}
