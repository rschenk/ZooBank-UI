var Author = Backbone.Model.extend({
	defaults: {
		id: null,
		lsid: '',
		familyname: '',
		givenname: '',
		label: '',
		validagentid: '',
		value: ''
	},
	
	hasLSID: function(){
		return !_.str.isBlank(this.get('ZBLSID'));
	}
});