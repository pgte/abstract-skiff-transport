'use strict';

var test = require('tape');
var AST = require('./');

test('transport connect is extendable', function(t) {
  var tr = new AST.Transport();
  var originalOptions = {a:1, b:2};

  tr._connect = function(id, options) {
    t.equal(id, 'id');
    t.equal(options, originalOptions);
    return 'connect object';
  };

  var c = tr.connect('id', originalOptions);
  t.equal(c, 'connect object');
  t.end();
});

test('transport listen is extendable', function(t) {
  var tr = new AST.Transport();
  var originalOptions = {a:1, b:2};

  tr._listen = function(localNodeId, options, _callback) {
    t.equal(localNodeId, 'local node id');
    t.equal(options, originalOptions);
    t.equal(_callback, callback);
    t.end();
  };

  tr.listen('local node id', originalOptions, callback);

  function callback() {}
});

test('connection send is extensible', function(t) {
  var c = new AST.Connection();

  var type = 'type';
  var args = {a:1, b:2};
  function callback() {}

  c._send = function(_type, _args, f) {
    t.equal(_type, type);
    t.equal(_args, args);
    t.equal(f, callback);
    t.end();
  };

  c.send(type, args, callback);
});

test('connection receive is extensible', function(t) {
  var c = new AST.Connection();

  var type = 'type';
  var args = {a:1, b:2};
  function callback() {}

  c._send = function(_type, _args, f) {
    t.equal(_type, type);
    t.equal(_args, args);
    t.equal(f, callback);
    t.end();
  };

  c.send(type, args, callback);
});

test('connection close is extensible', function(t) {
  var c = new AST.Connection();

  function callback() {}

  c._close = function(_callback) {
    t.equal(_callback, callback);
    t.end();
  };

  c.close(callback);
});
