var NomenclaturalActView = Backbone.View.extend({
	template: _.template($('#nomenclaturalActTemplate').html()),
	events: {
		'change #rank_id' : 'changeRankId',
		'click input[name="parent_rank_id"]' : 'changeParentId',
		'change #name': 'changeName',
		'change #parent_name': 'changeParentName'
	},
	
	initialize: function(options) {
		this.ranks = options.ranks;
		this.model.bind('change:rank', this.render, this);
		this.model.bind('change:parentRank', this.updateParentLabel, this);
	},
	
	render: function() {
		this.$el.html( this.template({ranks: this.ranks, model: this.model}) );
		
		this.$parentLabel = this.$el.find('label[for="parent_name"]');
		
		return this;
	},
	
	updateParentLabel: function(){
		this.$parentLabel.text("Parent " + this.model.get('parentRank').get('label').toLowerCase() );
	},
	
	/* UI event handlers */
	changeRankId: function(event) {
		var rankId = $(event.target).val(),
		    rank   = this.ranks.get(rankId);
			
		this.model.set({ rank: rank });
	},
	
	changeParentId: function(event){
		var parentId   = $(event.target).val(),
		    parentRank = this.ranks.get(parentId);
				
		this.model.set({ parentRank: parentRank });
	},
	
	changeName: function(event){ 
		this.model.set({ name: $(event.target).val() });
	},
	
	changeParentName: function(event){ 
		this.model.set({ parentName: $(event.target).val() });
	}
	
});