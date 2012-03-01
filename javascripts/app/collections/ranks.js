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
	
	/* 
	  The valid parents for a particular rank depend on where it sits and where its parents sit. 
	  
	  Quoth Rich: 
	  The basic rules are as follows:

	  The *only* ranks that can link to a name outside their own group are the
	  "full" ranks:  in this case, Genus can link to anything in the Family-Group,
	  and Species can link to anything in the Genus group.

	  Except for those "full" ranks, the others must link to a name of rank that
	  is higher up the chain, but within the same group.

	  So, for example, Subspecies can link to full Species (not sure how to deal
	  with "Microspecies" -- for now let's just pretend that doesn't exist) only.
	  Variety can link either to species, or to subspecies.  Form can link to
	  Variety, Subspecies, or Species -- and so on.

	  Anything within a rank-group OTHER THAN the "full" rank *MUST* have at least
	  one parent, and if the parent is not the "Full" rank, then all the links up
	  until the full rank must be included.

	  For example, "Variety" can have a parent that is either a Subspecies or a
	  full Species; but if a Subspecies, that Subspecies must also have a parent
	  of Species.

	  As for Full Rank, Species MUST have a parent within the genus-group, and if
	  that parent is not a genus itself, then whatever it is must be linked by one
	  or more parents until it hits the rank of Genus.

	  The full Genus rank is NOT required to have a parent.
	*/
	
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