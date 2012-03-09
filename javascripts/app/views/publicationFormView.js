var PublicationFormView = Backbone.View.extend({
	template: _.template($('#publicationTemplate').html()),
	subTemplates: [], // See comment in initializeSubTemplates() for how this is used

	// These are used as labels for the Publication.publicationTypes
	publicationTypeLabels: [ 
		'Article in a journal, magazine, or other periodical',
		'Book or monograph'
	],
	
	initialize: function(){
		_(this).bindAll('render', 'changeJournalNameInput', 'changeJournalId');
		
		this.authorInputListView = new AuthorListInputView({
			collection: this.model.get('authors')
		});
		this.authorInputListView.addEmptyModel();
		
		this.initializeSubTemplates();
		this.model.bind('change:type', this.render);
		this.model.bind('change:journalId', this.changeJournalId);
	},
	
	render: function() {
		var type = this.model.get('type'),
		    subTemplate = this.subTemplates[type];
			
		this.$el.html( this.template({view: this, model: this.model}) );
		
		// Render the specific fields for article or monograph typed publications
		this.$('#typeSpecificPublicationFields').html( subTemplate({ view: this, model: this.model }) );
		
		// Render the author List
		this.authorInputListView.setElement( this.$('#authorList')[0]);
		this.authorInputListView.render();
		
		this.initializeAutocompleter( this.$('#journalName') );
		
		Backbone.ModelBinding.bind(this);
		
		return this;
	},
	
	
	
	/* 
	   There are a few different types of publications, defined in the array Publication.publicationTypes
	   Each one of them has its own fields, and thus its own form that needs to be rendered. I decided to use
	   a convention here: 
	    * I expect to find the template for a publicationType of 'article' to be in #publicationArticleTemplate
		* I expect to find the template for a publicationType of 'monograph' to be in #publicationMonographTemplate
		* etc. 
			
	   I store the compiled templates in the subTemplates hash, with the key being the article type. That way,
	   in the render() function, all we have to do is use model.get('type') to look up the appropriate template.
	*/
	initializeSubTemplates: function(){
		_.each(this.model.constructor.publicationTypes, function(type){
			var templateName = '#publication' + _.str.capitalize(type) + 'Template'; // like #publicationArticleTemplate
			this.subTemplates[type] = _.template($(templateName).html());
		}, this);
	},
	
	initializeAutocompleter: function($el){
		// Store in closure so we can get to it in source()
		var view  = this,
		    model = this.model; 
		
		$el.customautocomplete({
	        source: function(request, response) {
				$.ajax({
					url: ZooBank.config.endpoint + "?method=find_journal",
					type: 'post',
					dataType: 'json',
					data: { journals_only: 1,
						    term: request.term},
					success: function(data) {
						if( data[0].id === 0 ) {
							response(null);
						} else {
							response($.map(data, function(d, i){ 
								d.value = d.label; // The value has HTML in it, which never works anyways
								return d;
							}));
						}
					}
				})
	        },
			minLength: 4,
			autoFocus: true,
			open: null,
			change: view.changeJournalNameInput,
			select: view.changeJournalNameInput
		});	
	},
	
	changeJournalNameInput: function(event, ui){
		var attributes;
		if( ui.item ) {
			// If user has selected something in the autocomplete list
			attributes = { journalName: ui.item.value,
				           journalId: ui.item.id };
		} else {
			attributes = { journalName: $(event.target).val(),
				           journalId: null };
			
		}
		this.model.set(attributes);
	},
	
	changeJournalId: function() {
		this.$('#journalName').toggleClass('hasLSID', this.model.get('journalId') != null);
	}
	
});
