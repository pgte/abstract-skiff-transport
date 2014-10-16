'use strict';

var test = require('tape');
var AST = require('./')

test('transport connect is extendable', function(t) {
  var tr = new AST.Transport();
  var originalOptions = {a:1, b:2};

  tr._connect = function(options) {
    t.equal(options, originalOptions);
    return 'connect object';
  }

  var c = tr.connect(originalOptions);
  t.equal(c, 'connect object');
  t.end();
});

test('transport listen is extendable', function(t) {
  var tr = new AST.Transport();
  var originalOptions = {a:1, b:2};

  tr._listen = function(options, _callback) {
    t.equal(options, originalOptions);
    t.equal(_callback, callback);
    t.end();
  }

  tr.listen(originalOptions, callback);

  function callback() {}
});