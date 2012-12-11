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
			//console.log('Element.__construct');
			_$el.bind('mouseover', this.proxy(this.onmouseover));
			_$el.bind('mouseout',  this.proxy(this.onmouseout));
			_$el.bind('click',     this.proxy(this.onclick));
			
			if (_bindMouseMove) {
				_$el.bind('mousemove', this.proxy(this.onmousemove));
			}
			
			this.$el = _$el;
			this.bindMouseMove = _bindMouseMove || this.bindMouseMove;
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
	
	Element.Canvas = Base.inherit(Element, {
		ctx: null,
		commands: [],
		width: 300,
		height: 300,
		pixelRatio: 1,
		bgColor: '#000',
		fgColor: '#FFF',
		
		__construct: function (_$el) {
			//console.log('Element.CanvasHelper.__construct');
			if (!_$el || !_$el.get(0).getContext) {
				throw new Error('require canvas element');
			}
			this.ctx = _$el.get(0).getContext('2d');
			this.$el = _$el;
		},
		setUp: function (_width, _height, _bgColor, _fgColor, _pixelRatio) {
			this.width = _width;
			this.height = _height;
			this.bgColor = _bgColor || '#000';
			this.fgColor = _fgColor || '#FFF';
			this.pixelRatio = _pixelRatio || window.devicePixelRatio || 1;
			// Set double value when retina display
			if(this.pixelRatio === 2) {
				this.$el.attr('width', this.width * 2);
				this.$el.attr('height', this.height * 2);
				this.ctx.scale(2, 2);
			} else {
				this.$el.attr('width', this.width);
				this.$el.attr('height', this.height);
			}
			// Set display bounds in CSS
			this.$el.width(this.width);
			this.$el.height(this.height);
		},
		addCommand: function (_cmd) {
			if (typeof _cmd === 'function') {
				this.commands.push(_cmd);
			} else if (typeof _cmd === 'object') {
				if (_cmd.length && _cmd.length > 0) {
					this.commands = this.commands.concat(_cmd);
				} else {
					throw new Error('require array or function');
				}
			} else {
				throw new Error('require array or function')
			}
		},
		clearCommand: function () {
			this.commands = [];
		},
		draw: function () {
			var i, len = this.commands.length;
			
			this.ctx.clearRect(0, 0, this.width, this.height);
			
			for (i = 0; i < len; i++) {
				this.commands[i].call(this, this.ctx);
			}
		},
		clear: function () {
			this.ctx.fillStyle = this.bgColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
		},
		circle: function (_x, _y, _radius, _color) {
			this.ctx.strokeStyle = _color || this.fgColor;
			this.ctx.beginPath();
			this.ctx.arc(_x, _y, _radius, 0, Math.PI * 2);
			this.ctx.closePath();
			this.ctx.stroke();
		},
		line: function (_x0, _y0, _x1, _y1, _color) {
			this.ctx.strokeStyle = _color || this.fgColor;
			this.ctx.beginPath();
			this.ctx.moveTo(_x0, _y0);
			this.ctx.lineTo(_x1, _y1);
			this.ctx.closePath();
			this.ctx.stroke();
		},
		text: function (_content, _x, _y, _color) {
			this.ctx.fillStyle = _color || this.fgColor;
			//this.ctx.font = '16px sans-serif';
			this.ctx.fillText(_content, _x, _y); 
		},
		commandFactory: function () {
			var command = Array.prototype.shift.apply(arguments);
			
			if (this[command] === null || this[command] === undefined) {
				throw new Error('There is no such command.');
			}
			
			return (function (self, cmd, args) {
				return function () {
					self[cmd].apply(self, args);
				};
			}(this, command, arguments));
		},
		animate: function () {
			
		}
	});
	
	window.uito.Element = Element;
})();