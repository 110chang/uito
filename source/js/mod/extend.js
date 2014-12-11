/*
*
*   Extend r1
*
*   @author Yuji Ito @110chang
*
*/

define([], function() {
  function extend(obj) {
    var i = 0;
    var o, p;
    var prop;
    var len = arguments.length;

    if (len < 2 || obj == null) {
      return obj;
    }
    o = Array.prototype.shift.call(arguments);
    len = arguments.length;
    for (; i < len; i++) {
      p = arguments[i];
      for (prop in p) {
        o[prop] = p[prop];
      }
    }
    return o;
  };
  
  return extend;
});
