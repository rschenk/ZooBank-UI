/* 
 This collection models the taxonomic tree. It should probably only be instantiated once
 (like a singleton) and boilerplate loaded the various ranks by using .reset()
*/
var Ranks = Backbone.Collection.extend({
	model: Rank,
	
	initialize: function(){
		// Create an easy way to access rank objects on name. 
		// Now you can do `this.species()` and get back the species Rank 
		this.on('reset', function() {
			this.each(function(rank){
				this[rank.get('label').toLowerCase()] = function(){ return rank; }
			}, this);
		}, this);
	},
	
	validParents: function(rank) {
		var validParents = [],
		    rankIndex;
		
		if( _.isNumber(rank) ) {
			rank = this.get(rank);
		}
		
		rankIndex = this.indexOf(rank);
		
		// Traverse backwards through the array until we hit a fullRank
		for( var i = rankIndex - 1; i >= 0; i-- ) {
			var m = this.at(i);
			validParents.push( m );
			if( m.get('fullRank') ) break;
		}
		
		return validParents;
	}
});