'use strict';

var formatter = require('esformatter');
var sprintf = require('sprintf').sprintf;
var ast = require('rocambole');

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
  };
}

module.exports = function(
  file, define,
  template, source
) {

  var name = null;
  var code = null;

  file = file
    .substr(0, file.lastIndexOf('.'))
    .replace(/\./g, '-');

  ast.moonwalk(ast.parse(source), function(node) {
    if (!name && node.type === 'CallExpression') {
      if (node.callee.toString() === define) {
        name = String(node.arguments[0].value).trim();
      }
    }

    if (!code && node.type === 'AssignmentExpression') {
      var left = node.left.toString();

      if (left.startsWith(name)) {
        name = String(left).trim();
        code = node.right.toString();
      }
    }
  });

  if (!name || !code) {
    return null;
  }

  var output = sprintf(template, {
    file: file, name: name,
    code: code, define: define
  });

  return formatter.format(
    output, {
      preset: 'default',
      indent: { value: '  ' }
    }
  );

};
