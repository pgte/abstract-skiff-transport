'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('can connect', function(t) {
    if (! options.connectURL) {
      throw new Error('need options.connectURL');
    }
    var connection = transport.connect(
      'local node id', 'local node meta', options.connectURL, 'meta');
    t.equal(typeof connection, 'object');
    options._connection = connection;
    t.end();
  });
}
