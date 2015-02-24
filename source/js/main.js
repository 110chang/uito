/*
 *
 *   Main 
 *
 */

requirejs.config({
  baseUrl: '/js',
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    'mod' : 'mod',
    'jquery' : 'lib/jquery',
    'jquery.easing' : 'lib/jquery.easing'
  },
  shim: {
    'jquery.easing': ['jquery']
  }
});

require([
  'mod/extend',
  'mod/like',
  'mod/nav/anchor'
], function(extend, like, Anchor) {
  $(function() {
    console.log('DOM ready.');
    var $navAnchor = $('#nav-anchor');

    if ($navAnchor.size() > 0) {
      Anchor().initialize({
        fix: 100
      });

      $(window).on(Anchor.ANIMATION_FINISH, function(e) {
        console.log('Anchor animation finish.');
      });
    }
    
  });
});

