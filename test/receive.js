'use strict';

var test = require('tape');

module.exports = receiveTest;

function receiveTest(transport, options) {
  test('can receive', function(t) {
    if (typeof options.broadcast != 'function') {
      throw new Error('options.broadcast must be a function');
    }

    var type = 'type';
    var args = {arrghg: 's', b: 2};
    var response = {some: 'response', is: 'due'};

    options.intercept(options._server, function(m) {
      t.deepEqual(m, [null, response]);
      t.end();
    });

    options._connection.receive(function(_type, _args, cb) {
      t.equal(_type, type);
      t.deepEqual(_args, args);
      cb(null, response);
    });

    options.broadcast(options._server, [type, args]);
  });
}
