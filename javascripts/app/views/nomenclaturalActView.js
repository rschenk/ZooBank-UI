var NomenclaturalActView = Backbone.View.extend({
	template: _.template($('#nomenclaturalActTemplate').html()),
	events: {
		'change #rank_id' : 'changeRankId',
		'click input[name="parent_rank_id"]' : 'changeParentId',
		'change #name': 'changeName',
		'change #parent_name': 'changeParentName'
	},
	
	initialize: function(options) {
		// The following events are fired by  the autocompleter, but I can't get them to work properly on the events object above
		_.bindAll(this, 'selectParentName', 'noresultsParentName', 'updateParentLSID');
		 
		this.taxonomy = options.taxonomy;
		this.parent   = this.model.get('parent');
		this.model.bind('change:rank', this.render, this);
		this.model.bind('change:parentRank', this.updateParentLabel, this);
		
		this.parent.bind('change', this.updateParentLSID);
	},
	
	render: function() {
		this.$el.html( this.template({taxonomy: this.taxonomy, model: this.model}) );
		this.$parentLabel = this.$('label[for="parent_name"]');
		this.$parentName  = this.$('#parent_name');
		
		this.initializeAutocompleter(this.$parentName);
		
		return this;
	},
	
	initializeAutocompleter: function($el){
		// Store in closure so we can get to it in source()
		var view  = this,
		    model = this.model; 
		
		$el.customautocomplete({
			source: function(request, response) {
				$.ajax({
					url: ZooBank.config.endpoint + "?method=get_protonym",
					type: 'post',
					dataType: 'json',
					data: {
						term: request.term,
						RankGroup: model.get('parentRank').get('label'),
						display_type: 'autocomplete'
					},
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
			select: view.selectParentName,
			noresults: view.noresultsParentName
		});	
	},
	
	updateParentLabel: function(){
		this.$parentLabel.text("Parent " + this.model.get('parentRank').get('label').toLowerCase() );
	},
	
	/* UI event handlers */
	changeRankId: function(event) {
		var rankId = $(event.target).val(),
		    rank   = this.taxonomy.get(rankId);
			
		this.model.set({ rank: rank });
	},
	
	changeParentId: function(event){
		var parentId   = $(event.target).val(),
		    parentRank = this.taxonomy.get(parentId);
				
		this.model.set({ parentRank: parentRank });
	},
	
	changeName: function(event){ 
		this.model.set({ name: $(event.target).val() });
	},
	
	changeParentName: function(event){
		this.parent.clear();
		this.parent.set({ value: $(event.target).val()  });
	},
	
	selectParentName: function(event, ui) {
		this.parent.set( ui.item );
	},
	
	noresultsParentName: function(event, searchTerm){
		this.parent.clear();
		this.parent.set({ value: searchTerm  });		
	},
	
	updateParentLSID: function(){
		this.$parentName.toggleClass('hasLSID', this.parent.hasLSID() );
	}
	
});