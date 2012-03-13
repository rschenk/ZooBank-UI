var Publication = Backbone.Model.extend({
	defaults: {
		id: null,
		lsid: '',
		type: null, // is defaulted to Publication.JOURNAL_ARTICLE in initialize()
		published: false,
		year: null,
		month: null,
		day: null,
		authors: new Authors(),
		title: '',
		journalName: '',
		journalId: '',
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
		this.set({type: this.get('type') || this.constructor.JOURNAL_ARTICLE });
	}
},{
	// Class Properties
	
	/* Constants for ReferenceTypeID.
	   This may need a refactor to its own model/collection at some point */
	JOURNAL_ARTICLE: '1',
	BOOK: '2',
});
