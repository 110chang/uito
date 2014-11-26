/*
*
*   Nav.SmoothScroll r3
*
*   @author Yuji Ito @110chang
*
*/

define([
  'mod/inherit',
  'mod/screen'
], function(inherit, Screen) {
  var _instance = null;
  var defaults = {
    duration: 1000,
    easing: 'easeInOutExpo',
    fix: 0
  };
  var SmoothScroll = {
    $a:  $('a[href*=#]'),
    conf: {},

    init: function(options) {
      $.extend(this.conf, defaults, options || {});
      this.$a.off('click.smoothScroll')
        .on('click.smoothScroll', $.proxy(this._onClick, this));

      return this;
    },
    _onClick: function(e) {
      var el = e.currentTarget;
      var $target, targetOffset, scrollHeight, clientHeight;

      if (el.hash.match(/^#\W/)) {
        return;
      }
      if (location.pathname.replace(/^\//,'') === el.pathname.replace(/^\//,'') 
      && location.hostname === el.hostname) {
        $target = $(el.hash);
        $target = $target.length && $target || $('[name=' + el.hash.slice(1) +']');
        if ($target.length) {
          targetOffset = $target.offset().top - this.conf.fix;
          targetOffset = targetOffset < 0 ? 0 : targetOffset;
          scrollHeight = Screen.scrollHeight();
          clientHeight = Screen.clientHeight();
          //console.log((targetOffset + clientHeight) +','+ scrollHeight);
          if ((targetOffset + clientHeight) > scrollHeight) {
            targetOffset = scrollHeight - clientHeight;
          }
          $('html,body').animate({scrollTop: targetOffset}, this.conf.duration, this.conf.easing);
          return false;
        }
      }
    }
  };

  if (_instance == null) {
    _instance = inherit(SmoothScroll).init();
  }
  
  return _instance;
});