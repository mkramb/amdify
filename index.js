'use strict';

module.exports = function(source, key) {

  var rocambole = require('rocambole');
  var astree = rocambole.parse(source);
  var namespace;

  rocambole.recursive(astree, function(node) {
    if (node.type == 'CallExpression') {
      if (node.callee.toString() == key) {
        namespace = node.arguments[0].value
      }
    }

    if (node.type == 'AssignmentExpression') {
      if (node.left.toString() === namespace) {
        console.log(namespace, node.right.toString());
      }
    }
  });

};

