/*
 *
 *   Main 
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
  'mod/nav/smoothscroll',
  'mod/screen',
  'mod/browser'
], function(smoothScroll, Screen, Browser) {
  $(function() {
    console.log('DOM ready.');
    
  });
});

