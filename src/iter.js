(function () {
	var uito	 = window.uito,
		Base	 = uito.Base;
	
/* ####################
 *
 *  iterator object
 *
 * #################### */
 
	Iterator = Base.inherit(null, {
		data	 : [],
		index	 : 0,
		length	 : 0,
		
		__construct: function (_data) {
			if (_data === undefined) {
				throw new Error('Require any data.');
			}
			this.data   = _data;
			this.length = _data.length;
		},
		next: function () {
			return this.data[this.index++];
		},
		current: function () {
			return this.index;
		},
		rewind: function () {
			this.index = 0;
		},
		hasNext: function () {
			return this.index < this.length;
		}
	});
	
	window.uito.Iterator = Iterator;
})();