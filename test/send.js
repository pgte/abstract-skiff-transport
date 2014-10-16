'use strict';

var test = require('tape');

module.exports = connectTest;

function connectTest(transport, options) {
  test('can send', function(t) {
    var type = 'type';
    var args = {a: 1, b: 2};
    options._connection.send(type, args, function(err, resp) {
      if (err) {
        throw err;
      }
      t.deepEqual(resp, [type, args]);
      t.end();
    });
  });
}
