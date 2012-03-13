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
	},
	
	/* Return a copy of the model's attributes for JSON stringification. 
	 * This is used to prepare the object for persisting to the web service.
	 * It doesn't actually return a JSON string — but that's the way the JavaScript API for JSON.stringify works.
	 */
	toJSON: function(){
		return {
			'GivenName': this.get('givenname'),
			'FamilyName': this.get('familyname'),
			'LogUserName': true,
			'no_verify': false
		};
	}
	
}, {
	apiMethod: 'insert_author'
});