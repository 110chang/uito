(function () {
	var uito	 = window.uito,
		Base	 = uito.Base,
		Window	 = Window || {};
	
/* ####################
 *
 *  window object
 *  require jQuery
 *
 * #################### */
 
	Window = Base.inherit(null, {
		
		__construct: function (_$el, _bindMouseMove) {
			
			_$el.bind('mouseover', this.proxy(this.onmouseover));
			_$el.bind('mouseout',  this.proxy(this.onmouseout));
			_$el.bind('click',     this.proxy(this.onclick));
			
			if (_bindMouseMove) {
				_$el.bind('mousemove', this.proxy(this.onmousemove));
			}
			
			this.$el = _$el;
			this.bindMouseMove = _bindMouseMove;
		},
		getBounds: function () {
			var scrollHeight = function () {
					// Ref. http://css-eblog.com/javascript/javascript-contents-height.html
					return Math.max.apply(null, [
						document.body.clientHeight,
						document.body.scrollHeight,
						document.documentElement.scrollHeight,
						document.documentElement.clientHeight
					]);
				},
				scrollTop = function () {
					return document.documentElement.scrollTop || document.body.scrollTop;
				},
				clientWidth = function () {
					return document.clientWidth || document.documentElement.clientWidth;
				},
				clientHeight = function () {
					return document.clientHeight || document.documentElement.clientHeight;
				};
			
			return {
				scrollHeight: scrollHeight,
				scrollTop   : scrollTop,
				clientWidth : clientWidth,
				clientHeight: clientHeight
			}
		}
		
	});
	
	window.uito.Window = Window;
})();