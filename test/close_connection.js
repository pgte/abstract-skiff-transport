'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('can disconnect', function(t) {
    options._connection.close(t.end.bind(t));
  });}
