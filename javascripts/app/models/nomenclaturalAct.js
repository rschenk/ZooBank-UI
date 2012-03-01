var NomenclaturalAct = Backbone.Model.extend({
	// These aren't so much defaults, as a way to document what attributes this model has.
	defaults: {
		rank: null, // Rank object
		name: '',
		validParentRanks: [],		
		parentRank: null, // Rank object
		parentName: ''
	},
	
	initialize: function(spec){
		_.bindAll(this, 'changeRank');
		// When we change the rank, we want to automatically load its validParents, 
		// and pre-select the first fullRank in the validParents list
		this.on('change:rank', this.changeRank);
		if( spec.rank ) this.trigger('change:rank');
	},
	
	changeRank: function(rank){
		var parentRanks = this.get('rank').validParents(),
		    parentRank = _.find(parentRanks, function(r){ return r.get('fullRank'); });
				
		this.set({ 
			validParentRanks: parentRanks,
			parentRank: parentRank
		});
	},
	
	nameLabel: function(){
		var rankLabel = this.get('rank').get('label');
		if( rankLabel === 'Species' ) {
			return 'Species epithet';
		} else {
			return rankLabel + " name"; // e.g. "Genus name"
		}
	}
	
	
});