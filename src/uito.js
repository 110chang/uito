(function () {
	var uito = window.uito = {},
		Base = Base || {};
	
/* ####################
 *
 *  object base
 *
 * #################### */		
		
	Base.inherit = (function () {
		
		// Reference: "Javascript Pattern" by Stoyan Stefanov.
		
		var F = function () {};
		
		return function (parent, props) {
			var child, i;
			
			child = function () {
				var goupstream = (function (_self) {
					return function (obj, arguments) {
						if (obj.ancestor && obj.ancestor.prototype !== Object.prototype) {
							if (obj.ancestor.prototype && obj.ancestor.prototype.hasOwnProperty('__construct')) {
								//console.log(obj.ancestor.prototype);
								obj.ancestor.prototype.__construct.apply(_self, arguments);
							}
							goupstream(obj.ancestor, arguments);
						}
					};
				}(this));
				
				goupstream(parent, arguments);
				
				if (child._super && child._super.hasOwnProperty('__construct')) {
					child._super.__construct.apply(this, arguments);
				}
				if (child.prototype.hasOwnProperty('__construct')) {
					child.prototype.__construct.apply(this, arguments);
				}
			}
			
			parent = parent || Object;
			
			F.prototype = parent.prototype;
			child.prototype = new F();
			child.ancestor = parent;
			child._super = parent.prototype;
			child.prototype.constructor = child;
						
			child.proxy = function (func) {
				var self = this;
				return (function () {
					return func.apply(self, arguments);
				});
			};
			child.prototype.proxy = child.proxy;
			
			child.extend = function (props, force) {
				var extended = props.extended,
					force = force || false;
				
				for (i in props) {
					if (force || child[i] === undefined || child[i] === null) {
						child[i] = props[i];
					}
				}
				if (extended) {
					extended(child);
				}
				return this;
			};
			
			for (i in props) {
				if (props.hasOwnProperty(i)) {
					child.prototype[i] = props[i];
				}
			}
			
			return child;
		};
	})();
	
	Base.copy = function (parent, child) { // create deep cory
		var toString = Object.prototype.toString,
			array_str = '[object Array]',
			i;
		
		child = child || {};
		
		for (i in parent) {
			if (typeof parent[i] === 'object') {
				child[i] = (toString.call(parent[i] === array_str)) ? [] : {};
				Base.copy(parent[i], child[i]);
			} else {
				child[i] = parent[i];
			}
		}
		return child;
	};
	
	Base.mix = function () { // create mix in
		var i, props, child = {};
		
		for (i = 0; i < arguments.length; i += 1) {
			for (props in arguments[i]) {
				if (arguments[i].hasOwnProperty(props)) {
					child[props] = arguments[i][props];
				}
			}
		}
		return child;
	};
	
	window.uito.Base = Base;
})();