'use strict';

var test = require('tape');

module.exports = sendTest;

function sendTest(transport, options) {
  test('can send', function(t) {
    var type = 'type';
    var args = {a: 1, b: 2};
    options._connection.send(type, args, function(err, _type, _args) {
      if (err) {
        throw err;
      }
      t.equal(_type, type);
      t.deepEqual(_args, args);
      t.end();
    });
  });
}
