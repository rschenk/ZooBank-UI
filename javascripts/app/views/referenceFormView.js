var ReferenceFormView = Backbone.View.extend({
	template: _.template($('#referenceTemplate').html()),
	subTemplates: [], // See comment in initializeSubTemplates() for how this is used

	// These are used as labels for the various Reference types
	referenceTypes: [
		{ id: Reference.JOURNAL_ARTICLE, label: 'Article in a journal, magazine, or other periodical' },
		{ id: Reference.BOOK, label: 'Book or Monograph'}
	],
	
	initialize: function(){
		_(this).bindAll('render', 'changeParentReferenceNameInput', 'changeParentReferenceId');
		
		this.authorInputListView = new AuthorListInputView({
			collection: this.model.get('authors')
		});
		this.authorInputListView.addEmptyModel();
		
		this.initializeSubTemplates();
		this.model.bind('change:type', this.render);
		this.model.bind('change:parentReferenceId', this.changeParentReferenceId);
	},
	
	render: function() {
		var type = this.model.get('referenceTypeId'),
		    subTemplate = this.subTemplates[type];
			
		this.$el.html( this.template({view: this, model: this.model}) );
		
		// Render the specific fields for article or monograph typed references
		this.$('#typeSpecificReferenceFields').html( subTemplate({ view: this, model: this.model }) );
		
		// Render the author List
		this.authorInputListView.setElement( this.$('#authorList')[0]);
		this.authorInputListView.render();
		
		this.initializeAutocompleter( this.$('#parentReferenceName') );
		
		Backbone.ModelBinding.bind(this);
		
		return this;
	},
	
	
	
	/* 
	   There are a few different types of references, defined in the array 
	   Each one of them has its own fields, and thus its own form that needs to be rendered. I decided to use
	   a convention here: 
	    * I expect to find the template for a referenceType of '1' (article) to be in #referenceType1Template
		* I expect to find the template for a publicationType of '2' (book) to be in #referenceType2Template
		* etc. 
			
	   I store the compiled templates in the subTemplates hash, with the key being the article type. That way,
	   in the render() function, all we have to do is use model.get('type') to look up the appropriate template.
	*/
	initializeSubTemplates: function(){
		_.each(this.referenceTypes, function(type){
			var templateName = '#referenceType' +type.id + 'Template'; // like #referenceType1Template
			this.subTemplates[type.id] = _.template($(templateName).html());
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
			change: view.changeParentReferenceNameInput,
			select: view.changeParentReferenceNameInput
		});	
	},
	
	changeParentReferenceNameInput: function(event, ui){
		var attributes;
		if( ui.item ) {
			// If user has selected something in the autocomplete list
			attributes = { parentReferenceName: ui.item.value,
				           parentReferenceId: ui.item.id };
		} else {
			attributes = { parentReferenceName: $(event.target).val(),
				           parentReferenceId: null };
			
		}
		this.model.set(attributes);
	},
	
	changeParentReferenceId: function() {
		this.$('#parentReferenceName').toggleClass('hasLSID', this.model.get('parentReferenceId') != null);
	}
	
});
