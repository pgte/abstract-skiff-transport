'use strict';

var test = require('tape');
var AST = require('./');

test('transport connect is extendable', function(t) {
  var tr = new AST.Transport();

  tr._protocolName = function() {
    return 'thisistheprotocolname';
  };
  tr._connect = function(id, localMeta, options, meta) {
    t.equal(id, 'id');
    t.equal(localMeta, 'local meta');
    t.deepEqual(
      options,
      {
        auth: null,
        hash: null,
        href: 'thisistheprotocolname://somehostname:8080',
        path: null,
        pathname: null,
        query: null,
        search: null,
        slashes: true,
        host: 'somehostname:8080',
        protocol: 'thisistheprotocolname',
        hostname: 'somehostname',
        port: 8080
      });
    t.equal(meta, 'meta');
    return 'connect object';
  };

  var c = tr.connect(
    'id', 'local meta', 'thisistheprotocolname://somehostname:8080', 'meta');
  t.equal(c, 'connect object');
  t.end();
});

test('transport listen is extendable', function(t) {
  var tr = new AST.Transport();

  tr._protocolName = function() {
    return 'thisistheprotocolname';
  };
  tr._listen = function(localNodeId, options, _listener, _callback) {
    t.equal(localNodeId, 'local node id');
    t.deepEqual(options, {
      auth: null,
      hash: null,
      href: 'thisistheprotocolname://somehostname:8081',
      path: null,
      pathname: null,
      query: null,
      search: null,
      slashes: true,
      host: 'somehostname:8081',
      protocol: 'thisistheprotocolname',
      hostname: 'somehostname',
      port: 8081
    });
    t.equal(_listener, listener);
    t.equal(_callback, callback);

    return 'SERVER';
  };

  var server = tr.listen(
    'local node id', 'thisistheprotocolname://somehostname:8081',
    listener, callback);

  t.equal(server, 'SERVER');
  t.end();

  function listener() {}
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
