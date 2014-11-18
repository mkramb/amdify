#!/usr/bin/env node

'use strict';

var fs = require('fs');
var amdify = require('../index.js');

var opts = require('nomnom')
  .option('file', {
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
  var template = fs.readFileSync(opts.template);
  var source = fs.readFileSync(opts.file);

  process.stdout.write(amdify(
    opts.file, opts.define,
    template.toString(), source
  ));
}
catch(err) {
  console.error(err.toString());
}
