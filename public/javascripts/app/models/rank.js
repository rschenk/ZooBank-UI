var Rank = Backbone.Model.extend({
	defaults: {
		fullRank: false
	},
	
	// Hello weird circular dependency
	validParents: function(){
		return this.collection.validParents(this);
	}
});