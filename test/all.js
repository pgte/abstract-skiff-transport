'use strict';

require('colors');

var domain = require('domain');

var tests = [
  'start_server',
  'connect',
  'send',
  'receive',
  'close_connection',
  'stop_server'
].map(function(m) {
  return require('./' + m);
});

module.exports = testAll;

function testAll(transport, options) {
  if (typeof options != 'object') {
    throw new Error('need options');
  }

  tests.forEach(function(t) {
    var d = domain.create();
    d.on('error', function(err) {
      console.error((err.stack || err.message || err.toString()).red);
      process.exit(1);
    });
    d.run(function() {
      t(transport, options);
    });
  });

}