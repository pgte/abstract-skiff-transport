'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('listens', function(t) {
    if (!options.listenPeerId) {
      throw new Error('need options.listenPeerId');
    }
    if (typeof options.connect != 'function') {
      throw new Error('need options.connect (function)');
    }
    if (typeof options.disconnect != 'function') {
      throw new Error('need options.disconnect (function)');
    }
    transport.listen('local node id', options.connectOptions, onConnection);

    function onConnection(peerId, connection) {
      t.equal(peerId, options.listenPeerId);
      t.equal(typeof connection, 'object');
      connection.close(function() {
        options.disconnect(client);
        transport._server.close(); // HACK, put this in the abstract api
        t.end();
      });
    }

    var client = options.connect();

  });
}