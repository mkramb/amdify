define('%(filename)s', [
  'jquery',
  'underscore'
], function ($, _) {
  return %(code)s;
});

%(define)s('%(namespace)s', null, require('%(filename)s'));
