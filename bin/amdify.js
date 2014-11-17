#!/usr/bin/env node

'use strict';

var fs = require('fs');
var amdify = require('../index.js');

var opts = require('nomnom')
  .option('filename', {
    help: 'Javascript file to analyze',
    required: true,
    abbr: 'f'
  })
  .option('namespace', {
    help: 'Identifier for defining namespace',
    required: true,
    abbr: 'n'
  })
  .parse();

try {
  amdify(
    fs.readFileSync(opts.filename),
    opts.namespace
  );
}
catch(err) {
  console.error(err.toString());
}
