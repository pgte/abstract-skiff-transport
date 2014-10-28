'use strict';

var test = require('tape');

module.exports = listenTest;

function listenTest(transport, options) {
  test('listens', function(t) {
    var client;

    if (!options.listenPeerId) {
      throw new Error('need options.listenPeerId');
    }
    if (typeof options.connect != 'function') {
      throw new Error('need options.connect (function)');
    }
    if (typeof options.disconnect != 'function') {
      throw new Error('need options.disconnect (function)');
    }
    if (! options.connectURL) {
      throw new Error('need options.connectURL');
    }
    var server = transport.listen(
      'local node id', options.connectURL, onConnection, onceListening);

    function onConnection(peerId, peerMeta, connection) {
      t.equal(peerId, options.listenPeerId);
      t.equal(typeof connection, 'object');
      connection.close(function() {
        options.disconnect(client);
        server.close();
        t.end();
      });
    }

    function onceListening(err) {
      if (err) {
        throw err;
      }
      client = options.connect();
    }

  });
}