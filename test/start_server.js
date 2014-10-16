'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('start server', function(t) {
    if (typeof options.startServer != 'function') {
      throw new Error('need a options.startServer function');
    }
    options.startServer(function(err, server) {
      if (err) {
        throw err;
      }
      options._server = server;
      t.end();
    });
  });
}