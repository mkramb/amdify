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
  .option('define', {
    help: 'Identifier for defining namespace',
    required: true,
    abbr: 'd'
  })
  .option('template', {
    default: __dirname + '/../index.tpl',
    help: 'Transformation template',
    abbr: 't'
  })
  .parse();

try {
  opts.source = fs.readFileSync(opts.filename).toString();
  opts.template = fs.readFileSync(opts.template).toString();

  debugger;

  process.stdout.write(
    amdify(opts)
  );
}
catch(err) {
  console.error(err.toString());
}
