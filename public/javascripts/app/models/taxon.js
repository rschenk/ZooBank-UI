var Taxon = Backbone.Model.extend({
	defaults: {
		id: null,
		lsid: '',
		label: '',
		namestring: '',
		value: ''
	},
	
	hasLSID: function(){
		return !_.str.isBlank(this.get('id'));
	}
});
