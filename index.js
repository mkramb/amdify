'use strict';

var formatter = require('esformatter');
var sprintf = require('sprintf').sprintf;
var ast = require('rocambole');

module.exports = function(opts) {
  var namespace = null;
  var code = null;

  ast.moonwalk(ast.parse(opts.source), function(node) {
    if (!namespace && node.type === 'CallExpression') {
      if (node.callee.toString() === opts.define) {
        namespace = String(node.arguments[0].value).trim();
      }
    }

    if (!code && node.type === 'AssignmentExpression') {
      var left = node.left.toString();

      if (left.startsWith(namespace)) {
        namespace = String(left).trim();
        code = node.right.toString();
      }
    }
  });

  if (!(namespace && code)) {
    return null;
  }

  opts.code = code;
  opts.filename = clean(opts.filename);
  opts.namespace = namespace;

  var output = sprintf(
    opts.template, opts
  );

  return formatter.format(
    output, {
      preset: 'default',
      indent: { value: '  11' }
    }
  );

};

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
  };
}

function clean(name) {
  return name
    .substr(0, name.lastIndexOf('.'))
    .replace(/\./g, '-');
}
