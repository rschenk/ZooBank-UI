var Reference = Backbone.Model.extend({
	/* The weird case here is because I am matching the db field names */
	defaults: {
		id: null,
		/* These are all directly from the API */
		parentReferenceId: null,
		referenceTypeId: null, // is defaulted to JOURNAL_ARTICLE in initialize()
		languageID: '',
		year: null,
		title: '',
		volume: '',
		number: '',
		pages: '', 
		figures: '',
		authors: new Authors(),
		
		/* These are not in the API, but are used */
		lsid: '',
		published: false,
		month: null,
		day: null,
		parentReferenceName: '',
		issn: '',
		isbn: '',
		publisher: '', 
		city: '',
		edition: ''
	},
	
	initialize: function(){
		// Default the 'type' attribute to 'article' unless it's set already
		this.set({referenceTypeId: this.get('referenceTypeId') || this.constructor.JOURNAL_ARTICLE });
	}
},{
	// Class Properties
	
	/* Constants for ReferenceTypeID.
	   This may need a refactor to its own model/collection at some point */
	JOURNAL_ARTICLE: '1',
	BOOK: '2',
});
