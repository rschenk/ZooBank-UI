var Publication = Backbone.Model.extend({
	defaults: {
		id: null,
		lsid: '',
		type: null, // is defaulted to 'article' in initialize()
		published: false,
		year: null,
		month: null,
		day: null,
		authors: new Authors(),
		title: '',
		journalName: '', 
		issn: '',
		isbn: '',
		volume: '',
		issue: '',
		pages: '', 
		language: '',
		publisher: '', 
		city: '',
		edition: ''
	},
	
	initialize: function(){
		// Default the 'type' attribute to 'article' unless it's set already
		this.set({type: this.get('type') || this.constructor.publicationTypes[0] });
	}
},{
	// Class Properties
	publicationTypes: ['article', 'monograph'],
});
