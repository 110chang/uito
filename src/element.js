(function () {
	var uito	 = window.uito,
		Base	 = uito.Base,
		Element = Element || {};
	
/* ####################
 *
 *  element object
 *  require jQuery
 *
 * #################### */
 
	Element = Base.inherit(null, {
		$el				 : null,
		bindMouseMove	 : false,
		animation		 : {
			hide		 : {
				opacity	 : 0
			},
			show		 : {
				opacity	 : 1
			},
			method		 : 'easeOutQuad',
			duration	 : 500
		},
		
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
		show: function () {
			$el.animate(this.animation.show, this.animation.method, this.animation.duration);
		},
		hide: function () {
			$el.animate(this.animation.hide, this.animation.method, this.animation.duration);
		},
		onmouseover: function (e) {
			console.log('mouseover');
		},
		onmouseout: function (e) {
			console.log('mouseout');
		},
		onmousemove: function (e) {
			console.log('mousemove');
		},
		onclick: function (e) {
			console.log('click');
		}
	});
	
	/*Elements.CanvasHelper = Base.inherit(Elements.Handler, {
		ctx: null,
		commands: [],
		width: 300,
		height: 300,
		pixelRatio: 2,
		
		__construct: function (_$el) {
			
			if (!_$el || !_$el.get(0).getContext) {
				throw new Error('require canvas element');
			}
			this.ctx = _$el.get(0).getContext('2d');
		},
		setup: function (_width, _height, _pixelRatio) {
			this.width = _width;
			this.height = _height;
			this.pixelRatio = _pixelRatio;
		},
		addCommand: function (_cmd) {
			if (typeof _cmd === 'function') {
				this.commands.push(_cmd);
			} else if (typeof _cmd === 'object') {
				if (_cmd.length && _cmd.length > 0) {
					this.commands.concat(_cmd);
				} else {
					throw new Error('require array or function');
				}
			} else {
				throw new Error('require array or function')
			}
		},
		draw: function () {
			var i,
				len = this.commands.length;
			
			this.ctx.clearRect($el.width(), $el.height());
			
			for (i = 0; i < len; i++) {
				this.commands[i].apply(this);
			}
			
			
		},
		animate: function () {
			
		}
	});*/
	
	window.uito.Element = Element;
})();