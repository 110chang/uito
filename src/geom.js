(function () {
	var uito	 = window.uito,
		Base	 = uito.Base,
		geom	 = {};
	
/* ####################
 *
 *  matrix
 *
 * #################### */
 	
 	/* ===== Matrix ===== */
 	
 	geom.Matrix = Base.inherit(null, {
 		structure: null,
 		
	 	__construct: function(array){
			if(array.length === undefined || array.length < 1){
				throw new Error('arguments must be array')
			}
			this.structure = array;
		},
		get: function (i, j) {
			if (i === undefined) {
				i = 0;
				//throw new Error('arguments not enough');
			}
			if (j === undefined) {
				j = 0;
				//throw new Error('arguments not enough');
			}
			return this.structure[i][j];
		},
		isEqual: function (matrix) {
			var here  = this.structure,
				there = matrix.structure,
				i, j;
			
			if(here.length === there.length && here[0].length === there[0].length) {
				for (i = 0; i < here.length; i++) {
					for (var j = 0; j < here[i].length; j++){
						if (here[i][j] !== there[i][j]) {
							return false;
						}
					}
				}
				return true;
			}
			return false;
		},
		toString: function () {
			var str	 = '',
				s	 = this.structure,
				i, j;
			
			for (i = 0; i < s.length; i++) {
				str += '[ ';
				for ( var j = 0; j < s[i].length; j++) {
					str += s[i][j];
					if (j < s[i].length - 1) {
						str += ', ';
					}
				}
				str += ' ]\n';
			}
			return str;
		}
	});
	
	geom.Matrix.sum = function (m1, m2) {
		var r	 = [],
			s1	 = m1.structure,
			s2	 = m2.structure,
			i, j;
		
		if (s1.length !== s2.length && s1[0].length !== s2[0].length) {
			throw new Error('Type of matrix is different.');
		}
		for (var i = 0; i < s1.length; i++) {
			r[i] = [];
			
			for (j = 0; j < s1[i].length; j++) {
				r[i][j] = s1[i][j] + s2[i][j];
			}
		}
		return new geom.Matrix(r);
	};
	
	geom.Matrix.sub = function(m1, m2){
		var r = [],
			s1 = m1.structure,
			s2 = m2.structure,
			i, j;
		
		if (s1.length !== s2.length && s1[0].length !== s2[0].length) {
			throw new Error('Type of matrix is different.');
		}
		for (i = 0; i < s1.length; i++) {
			r[i] = [];
			
			for (j = 0; j < s1[i].length; j++) {
				r[i][j] = s1[i][j] - s2[i][j];
			}
		}
		return new geom.Matrix(r);
	};
	
	geom.Matrix.scalarMultiply = function(matrix, num){
		var r = [],
			s = matrix.structure,
			i, j;
		
		for(i = 0; i < s.length; i++) {
			r[i] = [];
			
			for(j = 0; j < s[i].length; j++) {
				r[i][j] = s[i][j] * num;
			}
		}
		return new geom.Matrix(r);
	};
	geom.Matrix.multiply = function(m1, m2){
		var r = [],
			s1 = m1.structure,
			s2 = m2.structure,
			i, j;
		
		if (s1[0].length !== s2.length) {
			throw new Error('Can not define a matrix product');
		}
		for (i = 0; i < s1.length; i++) {
			r[i] = [];
			
			for(j = 0; j < s2[0].length; j++) {
				if (r[i][j] === undefined) {
					r[i][j] = 0;
				}
				for(k = 0; k < s2.length; k++) {
					r[i][j] += s1[i][k] * s2[k][j];
				}
			}
		}
		return new geom.Matrix(r);
	};
	geom.Matrix.transpose = function(matrix){
		var r = [],
			s = matrix.structure,
			i, j;
		
		for(i = 0; i < s[0].length; i++) {
			r[i] = [];
			for(j = 0; j < s.length; j++){
				r[i][j] = s[j][i];
			}
		}
		return new geom.Matrix(r);
	};
		
	geom.Matrix.invert = function (matrix) {
		// To Do
	};

	
/* ####################
 *
 *  geometry object
 *
 * #################### */
 	
	/* ===== Point ===== */

	geom.Point = Base.inherit(null, {
		x: 0,
		y: 0,
				
		__construct: function (x, y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		translate: function (x, y) {
			if (typeof x !== 'number' || typeof y !== 'number') {
				 throw "arguments must be Number.";
			}
			this.x += x;
			this.y += y;
		},
		slopeBetween: function (point) {
			if (!geom.Point.identify(point)) {
				 throw "arguments must be geom.Point.";
			}
			return (point.y - this.y) / (point.x - this.x) * -1;
		},
		angleBetween: function (point, asRadian) {
			if (asRadian === undefined) { asRadian = true; }
			if (!geom.Point.identify(point)) {
				 throw "arguments must be geom.Point.";
			}
			var radian = Math.atan2(point.y - this.y, point.x - this.x) * -1;
			return (asRadian) ? radian : radian * 180 / Math.PI;
		},
		distanceTo: function (point) {
			if (!geom.Point.identify(point)) {
				 throw "arguments must be geom.Point.";
			}
			return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
		},
		middlePointOf: function (point) {
			if (!geom.Point.identify(point)) {
				 throw "arguments must be geom.Point.";
			}
			return new geom.Point((this.x + point.x) / 2, (this.y + point.y) / 2);
		},
		toString: function () {
			return '( ' + this.x + ', ' + this.y + ' )';
		}
	}).extend({
		identify: function (point) {
			if (point === undefined || point === null) {
				return false;
			}
			if (point.x === undefined || point.x === null) {
				return false;
			}
			if (point.y === undefined || point.y === null) {
				return false;
			}
			return true;
		}
	});
	
	/* ===== Line (Segment, Ray) ===== */
	
	geom.Segment = Base.inherit(null, {
		start     : null,
		end       : null,
		direction : 0,
		length    : 0,
		
		__construct: function () {
			if (arguments.length < 2) {
				throw 'Not enough arguments';
			} else if (arguments.length === 2) {
				// Type of arguments must be Geometry.Point
				if (arguments[0].x === undefined || arguments[0].y === undefined 
					|| arguments[1].x === undefined || arguments[1].y === undefined) {
					throw 'arguments must be geom.Point.';
				}
				this.start = arguments[0];
				this.end   = arguments[1];
				this.direction = this.start.angleBetween(this.end);
				this.length = this.start.distanceTo(this.end);
				
			} else if (arguments.length === 3) {
				// The first argument must be geom.Point. Remainings must be Number.
				if (arguments[0].x === undefined || arguments[0].y === undefined 
					|| typeof(arguments[1]) !== 'number' || typeof(arguments[2]) !== 'number') {
					throw 'arguments invalid.';
				}
				this.start = arguments[0];
				this.direction = arguments[1];
				this.length = arguments[2];
				this.end = new geom.Point(
					this.start.x + this.length * Math.cos(this.direction),
					this.start.y + this.length * Math.sin(this.direction)
				);
				
			} else if (arguments.length > 3) {
				// Type of arguments must be Number. Remainings are ignore.
				for (var i = 0; i < arguments.length; i += 1) {
					if (typeof(arguments[i]) !== 'number') {
						throw 'arguments must be Number.';
					}
				}
				this.start = new geom.Point(arguments[0], arguments[1]);
				this.end   = new geom.Point(arguments[2], arguments[3]);
				this.direction = this.start.angleBetween(this.end);
				this.length = this.start.distanceTo(this.end);
			}
		},
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			var x0 = this.start.x,
				y0 = this.start.y,
				x1 = this.end.x,
				y1 = this.end.y;
			
			if (point.x < x0 || point.y < y0 || x1 < point.x || y1 < point.y) {
				return false;
			}
			return (y1 - y0) * point.x - (x1 - x0) * point.y - x0 * y1 + x1 * y0 === 0;
		},
		intersection: function (segment) {
			if (!geom.Segment.identify(segment)) {
				throw 'arguments must be geom.Segment.';
			}
			var t1 = new geom.Triangle(this.start, this.end, segment.start),
				t2 = new geom.Triangle(this.start, this.end, segment.end),
				t3 = new geom.Triangle(segment.start, segment.end, this.start),
				t4 = new geom.Triangle(segment.start, segment.end, this.end);
				
			return t1.getArea() * t2.getArea() < 0 && t3.getArea() * t4.getArea() < 0;
		},
		distance: function () {
			return this.length;
		},
		middlePoint: function () {
			return this.start.middlePointOf(this.end);
		},
		getAngle: function (asRadian) {
			if (asRadian === undefined) { asRadian = true; }
			var radian = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
			return (asRadian) ? radian : radian * 180 / Math.PI;
		},
		angleBetween: function (segment, asRadian) {
			if (asRadian === undefined) { asRadian = true; }
			if (!geom.Segment.identify(segment)) {
				throw 'arguments must be geom.Segment.';
			}
			var radian = segment.getAngle() - this.getAngle();
			
			//console.log(segment.getAngle());
			//console.log(this.getAngle());
			
			return (asRadian) ? radian : radian * 180 / Math.PI;;
		},
		toString: function () {
			return '( ' + this.start.x + ', ' + this.start.y + ' ) -> ( ' + + this.end.x + ', ' + this.end.y + ' )';
		}
	}).extend({
		identify: function (segment) {
			if (segment === undefined || segment === null) {
				return false;
			}
			if (segment.start === undefined || segment.start === null) {
				return false;
			}
			if (segment.end === undefined || segment.end === null) {
				return false;
			}
			return true;
		}
	});
	
	geom.Ray = Base.inherit(geom.Segment, {
		
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			var x0 = this.start.x,
				y0 = this.start.y,
				x1 = this.end.x,
				y1 = this.end.y;
			
			if (point.x < x0 || point.y < y0) {
				return false;
			}
			return (y1 - y0) * point.x - (x1 - x0) * point.y - x0 * y1 + x1 * y0 === 0;
		},
		intersection: function (segment) {
			if (!geom.Segment.identify(segment)) {
				throw 'arguments must be geom.Segment.';
			}
			var t1 = new geom.Triangle(this.start, this.end, segment.start),
				t2 = new geom.Triangle(this.start, this.end, segment.end),
				t3 = new geom.Triangle(segment.start, segment.end, this.start),
				t4 = new geom.Triangle(segment.start, segment.end, this.end);
			//console.log(t1.getArea() + ', ' + t2.getArea() + ', ' + t3.getArea() + ', ' + t4.getArea());
			// T4 condition is not required
			return t1.getArea() * t2.getArea() < 0 && t3.getArea() < 0;
		},
		distance: function () {
			return Infinity;
		},
		middlePoint: function () {
			return false;
		},
		toString: function () {
			return '( ' + this.start.x + ', ' + this.start.y + ' ) -> Infinity';
		}
	});
	
	geom.Line = Base.inherit(geom.Segment, {
		
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			var x0 = this.start.x,
				y0 = this.start.y,
				x1 = this.end.x,
				y1 = this.end.y;
			
			return (y1 - y0) * point.x - (x1 - x0) * point.y - x0 * y1 + x1 * y0 === 0;
		},
		intersection: function (segment) {
			if (!geom.Segment.identify(segment)) {
				throw 'arguments must be geom.Segment.';
			}
			var t1 = new geom.Triangle(this.start, this.end, segment.start),
				t2 = new geom.Triangle(this.start, this.end, segment.end);
				
			return t1.getArea() * t2.getArea() < 0;
		},
		distance: function () {
			return Infinity;
		},
		middlePoint: function () {
			return false;
		},
		toString: function () {
			return '-Infinity -> Infinity';
		}
	});
	
	/* ===== Triangle ===== */
	
	geom.Triangle = Base.inherit(null, {
		start			 : null,
		middle			 : null,
		end				 : null,
		area			 : 0,
		gravityCenter	 : null,
		circumCenter	 : null,
		circumCenter2	 : null,
		segmentA		 : null,
		segmentB		 : null,
		segmentC		 : null,
		angleA			 : null,
		angleB			 : null,
		angleC			 : null,
		
		__construct: function (start, middle, end) {
			if (arguments[0].x === undefined || arguments[0].y === undefined 
				|| arguments[1].x === undefined || arguments[1].y === undefined
				|| arguments[2].x === undefined || arguments[2].y === undefined) {
				throw "arguments must be Geometry.Point.";
			}
			this.start		 = arguments[0];
			this.middle		 = arguments[1];
			this.end		 = arguments[2];
			
			// Calcurate in advance
			var x0 = this.start.x,
				y0 = this.start.y,
				x1 = this.middle.x,
				y1 = this.middle.y,
				x2 = this.end.x,
				y2 = this.end.y,
				area;
			
			area = this.area = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / 2;
			this.gravityCenter = new geom.Point((x0 + x1 + x2) / 3, (y0 + y1 + y2) / 3);
			
			this.angleA = (function () {
				var ac = new geom.Segment(x0, y0, x2, y2),
					ab = new geom.Segment(x0, y0, x1, y1);
				
				return Math.abs(ac.angleBetween(ab));
			}());
			
			this.angleB = (function () {
				var ba = new geom.Segment(x1, y1, x0, y0),
					bc = new geom.Segment(x1, y1, x2, y2);
				
				return Math.abs(ba.angleBetween(bc));
			}());
			
			this.angleC = (function () {
				var cb = new geom.Segment(x2, y2, x1, y1),
					ca = new geom.Segment(x2, y2, x0, y0);
								
				return Math.abs(cb.angleBetween(ca));
			}());
			
			this.segmentA = new geom.Segment(this.middle, this.end);
			this.segmentB = new geom.Segment(this.end, this.start);
			this.segmentC = new geom.Segment(this.start, this.middle);
			
			/*this.circumCenter = (function () {
				var x10 = x1 - x0, x21 = x2 - x1, x20 = x2 - x0,
					y10 = y1 - y0, y21 = y2 - y1, y20 = y2 - y0,
					a = x10 * x10 + y10 * y10, b = x20 * x20 + y20 * y20,
					c = x10 * y10 + x10 * y20 + x20 * y10 + x20 * y20;
				
				return new geom.Point(
					(a * y10 + a * y20 + b * y10 + b * y20) / 2 * c,
					(x10 * a + x10 * b + x20 * a + x20 * b) / 2 * c
				);
			}());*/
			
			/*this.circumCenter = (function () {
				var a	 = this.angleA,
					b	 = this.angleB,
					c	 = this.angleC,
					sin	 = Math.sin,
					cos  = Math.cos,
					f	 = function (_1, _2, _3) {
						var a2 = 2 * sin(a) * cos(a),
							b2 = 2 * sin(b) * cos(b),
							c2 = 2 * sin(c) * cos(c);
							
						return (_1 * a2 + _2 * b2 + _3 * c2) / (a2 + b2 + c2);
					}
				return new geom.Point(f(x0, x1, x2), f(y0, y1, y2));
			}());*/
			
			/*this.circumCenter = (function () {
				var x12 = Math.abs(x1 - x2),
					x20 = Math.abs(x2 - x0),
					x01 = Math.abs(x0 - x1),
					y12 = Math.abs(y1 - y2),
					y20 = Math.abs(y2 - y0),
					y01 = Math.abs(y0 - y1),
					s = area,
					f = function (a, b, c, va, vb, vc) {						
						return (a * a * (b * b + c * c - a * a) * va + b * b * (c * c + a * a - b * b) * vb + c * c * (a * a + b * b - c * c) * vc) / (16 * s * s);
					}
				return new geom.Point(f(x12, x20, x01, x0, x1, x2), f(y12, y20, y01, y0, y1, y2));
			}());*/
			
			//console.log(this.circumCenter);
			
		},
		getArea: function (asSigned) {
			if (asSigned === undefined) {
				asSigned = true;
			}
			return (asSigned) ? this.area : Math.abs(this.area);
		},
		getGravityCenter: function () {
			return this.gravityCenter;
		},
		getCircumCenter: function () {
			return this.circumCenter;
		},
		translate: function (x, y) {
			if (typeof x !== 'number' || typeof y !== 'number') {
				 throw "arguments must be Number.";
			}
			this.start.translate(x, y);
			this.middle.translate(x, y);
			this.end.translate(x, y);
		},
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			var seg = new geom.Segment(point, this.gravityCenter);
			
			return !this.segmentA.intersection(seg) && !this.segmentB.intersection(seg) && !this.segmentC.intersection(seg);
		}
	});
	
	/* ===== Rectangle ===== */
 	
	geom.Rectangle = Base.inherit(null, {
		x		 : 0,
		y		 : 0,
		width	 : 100,
		height	 : 100,
		center	 : null,
			
		__construct: function (x, y, width, height) {
			this.x		 = x || 0;
			this.y		 = y || 0;
			this.width	 = width || 100;
			this.height	 = height || 100;
			this.center  = new geom.Point(this.x + this.width / 2, this.y + this.height / 2);
		},
		getCenter: function () {
			return this.center;
		},
		translate: function (x, y) {
			if (typeof x !== 'number' || typeof y !== 'number') {
				 throw 'arguments must be Number.';
			}
			this.x += x;
			this.y += y;
		},
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			return (this.x <= point.x && point.x <= this.x + this.width) && (this.y <= point.y && point.y <= this.y + this.height);
		},
		collapse: function (rect) {
			if (!geom.Rectangle.identify(rect)) {
				throw 'arguments must be geom.Rectangle.';
			}
			var lt = new geom.Point(rect.x, rect.y),
				rt = new geom.Point(rect.x + rect.width, rect.y),
				rb = new geom.Point(rect.x + rect.width, rect.y + rect.height),
				rt = new geom.Point(rect.x, rect.y + rect.height);
			
			return this.contain(lt) || this.contain(rt) || this.contain(rb) || this.contain(rt);
		}
	}).extend({
		identify: function (rect) {
			if (rect === undefined || rect === null) {
				return false;
			}
			if (rect.x === undefined || rect.x === null) {
				return false;
			}
			if (rect.y === undefined || rect.y === null) {
				return false;
			}
			if (rect.width === undefined || rect.width === null) {
				return false;
			}
			if (rect.height === undefined || rect.height === null) {
				return false;
			}
			return true;
		}
	});
	
	/* ===== Circle ===== */
	
	geom.Circle = Base.inherit(null, {
		x		 : 0,
		y		 : 0,
		radius	 : 100,
		center	 : null,
				
		__construct: function (x, y, radius) {
			this.x		 = x || 0;
			this.y		 = y || 0;
			this.radius	 = radius || 1;
			this.center  = new geom.Point(this.x, this.y);
		},
		getCenter: function(){
			return this.center;
		},
		translate: function (x, y) {
			if (typeof x !== 'number' || typeof y !== 'number') {
				 throw 'arguments must be Number.';
			}
			var origin = new geom.Matrix([[this.x], [this.y], [1]]),
				trans  = new geom.Matrix([[1, 0, x], [0, 1, y], [0, 0, 1]]),
				result = geom.Matrix.multiply(trans, origin);
				
			this.x = result.get();
			this.y = result.get(1, 0); 
		},
		scaling: function (s) {
			this.radius *= s;
		},
		contain: function (point) {
			if (!geom.Point.identify(point)) {
				throw 'arguments must be geom.Point.';
			}
			return Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) <= this.radius * this.radius;
		},
		collapse: function (circ) {
			if (!geom.Circle.identify(circ)) {
				throw 'arguments must be geom.Circle.';
			}
			return (Math.pow(circ.x - this.x, 2) + Math.pow(circ.y - this.y, 2)) <= Math.pow(this.radius + circ.radius, 2);
		}
	}).extend({
		identify: function (circ) {
			if (circ === undefined || circ === null) {
				return false;
			}
			if (circ.x === undefined || circ.x === null) {
				return false;
			}
			if (circ.y === undefined || circ.y === null) {
				return false;
			}
			if (circ.radius === undefined || circ.radius === null) {
				return false;
			}
			return true;
		}
	});
	
	/*geom.powOfTwo = function(num){
		//console.log(typeof(num)==='number');
		if(typeof(num)!=='number'){
			throw "arguments must be number.";
		}
		return !(num&(num-1));
	};
	
	geom.orthogonalSlope = function(slope){
		if(typeof(slope)!=='number'){
			throw "arguments must be number.";
		}
		return -1/slope;
	};
	geom.areOrthogonal = function(slope1, slope2){
		if(typeof(slope1)!=='number'||typeof(slope2)!=='number'){
			throw "arguments must be number.";
		}
		if(slope1*slope2===-1){
			return true;
		}
		return false;
	}
	geom.lineIntersect = function(point1, slope1, point2, slope2){
		var t0 = (slope1*point1.x - slope2*point2.x + point2.y - point1.y) / (slope1 - slope2);
		var t1 = slope1*(t0 - point1.x)+point1.y;
		return new Geometry.Point(t0, t1);
	};
	geom.distance = function(point1, point2){
		return Math.sqrt(Math.pow(point2.x-point1.x, 2) + Math.pow(point2.y-point1.y, 2));
	};
	geom.findMiddlePoint = function(point1, point2){
		var t0 = (point1.x+point2.x)/2;
		var t1 = (point1.y+point2.y)/2;
		return new Geometry.Point(t0, t1);
	};
	geom.collisionBetweenCircle = function(circle1, circle2){
		return (Math.pow(circle2.x-circle1.x, 2)+Math.pow(circle2.y-circle1.y, 2))<Math.pow(circle1.radius+circle2.radius, 2);
	};*/
	
	window.uito.geom = geom;
})();