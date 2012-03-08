var AuthorInputView = Backbone.View.extend({
	tagname: 'li',
	template: _.template($('#authorInputTemplate').html()),
	
	events: {
		'change .authorInput': 'changeAuthorInput'
	},
	
	initialize: function(){
		_.bindAll(this, 'changeAuthorInput', 'selectAuthorInput', 'noresultsAuthorInput');
		this.model.bind('change:ZBLSID', this.updateLSID, this);
	},
	
	render: function(){
		this.$el.html(this.template({ model: this.model }) );
		this.$authorInput = this.$('.authorInput');
		this.initializeAutocompleter(this.$authorInput);
		this.updateLSID();

		return this;
	},
	
	updateLSID: function() {
		this.$authorInput.toggleClass('hasLSID', this.model.hasLSID() );
	},
	
	initializeAutocompleter: function($el){
		// Store in closure so we can get to it in source()
		var view  = this,
		    model = this.model; 
		
		$el.customautocomplete({
	        source: function(request, response) {
				$.ajax({
					url: ZooBank.config.endpoint + "?method=find_author",
					type: 'post',
					dataType: 'json',
					data: {term: request.term},
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
			select: view.selectAuthorInput,
			noresults: view.noresultsAuthorInput
		});	
	},
	
	changeAuthorInput: function(event){
		this.model.clear();
		this.model.set({ value: $(event.target).val()  });
	},
	
	selectAuthorInput: function(event, ui) {
		this.model.set( ui.item );
	},
	
	noresultsAuthorInput: function(event, searchTerm){
		this.model.clear();
		this.model.set({ value: searchTerm  });		
	}
	
});