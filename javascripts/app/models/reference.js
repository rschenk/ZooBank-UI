var Reference = Backbone.Model.extend({
	url: function(){
		return ZooBank.config.endpoint + "?method=insert_reference";
	},
	
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
	},
	
	/* 
	 * Builds a string according to the w3c date recommendations http://www.w3.org/TR/NOTE-datetime
	 * 
	 * Year:
	 * 	YYYY (eg 1997)
	 * Year and month:
	 * 	YYYY-MM (eg 1997-07)
	 * Complete date:
	 * 	YYYY-MM-DD (eg 1997-07-16)
	 */
	datePublished: function(){
		var datePublished = this.get('year');
		
		if( this.get('month') ) {
			datePublished += "-" + this.get('month');
			
			if( this.get('day') ) {
				datePublished += "-" + this.get('day');
			}
		}
		
		return datePublished;
	},
	
	/* Return a copy of the model's attributes for JSON stringification. 
	 * This is used to prepare the object for persisting to the web service.
	 * It doesn't actually return a JSON string — but that's the way the JavaScript API for JSON.stringify works.
	 */
	toJSON: function(){
		var jsonAttributes = _(this.attributes).clone();
		
		return _(jsonAttributes).extend({
			Authors: this.get('authors').toJSON(), // Why Backbone doesn't call toJSON by default is beyond me!
			DatePublished: this.datePublished(),
			LogUserName: 'true'
		});
	}
},{
	// Class Properties
	
	
	/* Constants for ReferenceTypeID.
	   This may need a refactor to its own model/collection at some point */
	JOURNAL_ARTICLE: '1',
	BOOK: '2',
});
