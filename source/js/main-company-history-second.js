/*
 *
 *   Main / History / Second
 *
 */

requirejs.config({
  baseUrl: '/js',
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    'mod' : 'mod'
  }
});

require([
  'mod/extend',
  'mod/like',
  'mod/nav/anchor'
], function(extend, like, Anchor) {
  $(function() {
    console.log('DOM ready.');
    console.log('this is history');
  });
});

