(function () {
	var uito = window.uito,
		Base = uito.Base,
		Event = uito.Event = Event || {};

/* ####################
 *
 * event object
 *
 * #################### */
 	
/* event.handler object */
/* Reconfigured to quote from the "Javascript The Good Parts" by Douglas Crockford. */

	Event = Base.inherit(null, {
		stack: {},
		
		fire: function (e) {
			var array,
				func,
				handler,
				type = (typeof e === 'string') ? e : e.type,
				i;
			//
			if (this.stack.hasOwnProperty(type)) {
				array = this.stack[type];
				for (i = 0; i < array.length; i += 1) {
					handler = array[i];
					func = handler.method;
					if (typeof func === 'string') {
						func = this[func];
					}
					func.apply(this, handler.params || [e]);
				}
			}
		},
		add: function (type, method, params) {
			var handler, i;
			
			handler = {
				method: method,
				params: params
			};
			
			if (this.stack.hasOwnProperty(type)) {
				// Check duplicate registrations
				for (i in this.stack[type]) {
					if (handler.method === this.stack[type][i].method) {
						return false;
					}
				}
				
				this.stack[type].push(handler);
			} else {
				this.stack[type] = [handler];
			}
		},
		remove: function (type, method) {
			var array = this.stack[type],
				func,
				handler,
				i;
			//
			if (this.stack.hasOwnProperty(type)) {
				for (i = 0; i < array.length; i += 1) {
					handler = array[i];
					func = handler.method;
					if (func === method) {
						array.splice(i, 1);
					} else {
						throw new Error('There is no such function.');
					}
				}
				if (array.length === 0) {
					delete this.stack[type];
				}
			} else {
				throw new Error('There is no such event "'+ type +'".');
			}
		},
		dump: function () {
			var prop,
				method,
				str = '{ ',
				len, h, i;
			//
			for (prop in this.stack) {
				str += prop +': ';
				h = this.stack[prop];
				len = h.length;
				if (len > 0) {
					str += '[ ';
					for (i = 0; i < len; i += 1) {
						method = h[i]['method'];
						if (typeof method === 'string') {
							str += method;
						} else {
							str += '"Any Function"';
						}
						if (i < len - 1) {
							str += ', ';
						}
					}
					str += ' ]';
				}
				str += ', ';
			}
			str += ' }';
			return str;
		}
	});
	
	/* event.sequencer object */

	Event.Sequence = Base.inherit(Event, {
		sequence: [],
		autoDequeue: false,
		fireAfterAllSequenece: false,
		//
		__constructor: function () {
			this.add('onQueueFinish', this.onqueuefinish);
		},
		queue: function (func) {
			this.sequence.push(func);
		},
		dequeue: function () {
			var f;
			if (this.sequence.length > 0) {			
				(f = this.sequence.shift())();
				if (f.callback !== undefined && f.callback !== null) {
					this.fire('onQueueFinish');
				}
			}
		},
		onqueuefinish: (function () {
			var func = function () {
				this.fire('onSequenceFinish');
				this.remove('onQueueFinish', proxy(this, this.onqueuefinish));
			}
			return function () {
				if (this.sequence.length > 0) {
					if (this.autoDequeue) {
						this.dequeue();
					}
				} else {
					if (this.fireAfterAllSequenece) {
						func();
						func = null;
					}
				}
			}
		})(),
		fireAfterAll: function (b) {
			this.fireAfterAllSequenece = b;
		}
	});
	
	window.uito.Event = Event;
})();