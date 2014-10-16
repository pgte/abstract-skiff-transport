'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('stop server', function(t) {
    if (typeof options.stopServer != 'function') {
      throw new Error('need a options.stopServer function');
    }
    options.stopServer(options._server, t.end.bind(t));
  });
}