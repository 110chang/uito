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
  'mod/extend',
  'mod/like'
], function(extend, like) {
  $(function() {
    console.log('DOM ready.');
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    function Segment(start, end) {
      this.start = start;
      this.end = end;
    }
    extend(Segment.prototype, {
      getDistance: function() {
        var x0 = this.start.x;
        var y0 = this.start.y;
        var x1 = this.end.x;
        var y1 = this.end.y;
        return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      },
      test: function() {
        var t = new Triangle(P, Q, R);
        console.log(t);
      }
    });
    function Triangle(start, middle, end) {
      if (!like(start, Point.prototype)) {
        throw new Error('Arguments must be Point.');
      }
      this.start = start;
      this.middle = middle;
      this.end = end;
    }
    var P = new Point(0, 0);
    var Q = new Point(10, 10);
    var R = new Point(10, 0);
    var s = new Segment(P, Q);
    console.log(s.getDistance());

    s.test();
  });
});

