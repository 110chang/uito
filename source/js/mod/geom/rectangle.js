/*
*
*   geom.Rectangle r1
*
*   @author Yuji Ito @110chang
*
*/

define([
  'mod/extend',
  'mod/like',
  'mod/geom/point'
], function(extend, like, Point) {
  function Rectangle(x, y, width, height) {
    x = x == null ? 0 : x;
    y = y == null ? 0 : y;
    width = width == null ? 100 : width;
    height = height == null ? 100 : height;

    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Arguments must be Number.');
    }
    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Arguments must be Number.');
    }
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
    this.center = new Point(x + width / 2, y + height / 2);
  }
  extend(Rectangle.prototype, {
    x      : 0,
    y      : 0,
    width  : 100,
    height : 100,
    center : null,
    getCenter: function() {
      return this.center;
    },
    translate: function(x, y) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('Arguments must be Number.');
      }
      this.x += x;
      this.y += y;
      this.center.translate(x, y);
    },
    contain: function(point) {
      if (!like(point, Point.prototype)) {
        throw new Error('Arguments must be Point.');
      }
      var h = this.x <= point.x && point.x <= this.x + this.width;
      var v = this.y <= point.y && point.y <= this.y + this.height;
      return h && v;
    },
    collapse: function(rect) {
      if (!like(rect, Rectangle.prototype)) {
        throw new Error('Arguments must be Rectangle.');
      }
      var LT = new Point(rect.x, rect.y);
      var RT = new Point(rect.x + rect.width, rect.y);
      var RB = new Point(rect.x + rect.width, rect.y + rect.height);
      var LB = new Point(rect.x, rect.y + rect.height);
      var contain = this.contain;
      
      return contain(LT) || contain(RT) || contain(RB) || contain(LB);
    }
  });

  return Rectangle;
});