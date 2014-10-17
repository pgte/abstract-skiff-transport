'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('can connect', function(t) {
    if (! options.connectOptions) {
      throw new Error('need options.connectOptions');
    }
    var connection = transport.connect('local node id', options.connectOptions);
    t.equal(typeof connection, 'object');
    options._connection = connection;
    t.end();
  });
}