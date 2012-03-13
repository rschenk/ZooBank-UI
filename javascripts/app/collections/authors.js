var Authors = Backbone.Collection.extend({ 
	model: Author,
	
	/* Retuns an array of Authors who have IDs */
	existInZB: function() {
		return this.reject(function(author){ return author.isNew(); });
	},
	
	/* Returns an array of Authors who do not exist in ZB and need to be registered */
	needRegistration: function() {
		return this.chain()
			.filter(function(author){ return author.isNew(); })
			.reject(function(author){ return author.isBlank(); })
			.value();
	},
	
	// The insert_author API wants a comma-delimited list of author IDs so that's what we return here.
	toJSON: function(){
		return _(this.existInZB()).pluck('id').join();
	}
 });