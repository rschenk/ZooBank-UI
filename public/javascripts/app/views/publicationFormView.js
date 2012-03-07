var PublicationFormView = Backbone.View.extend({
	template: _.template($('#publicationTemplate').html()),
	subTemplates: [], // See comment in initializeSubTemplates() for how this is used

	// These are used as labels for the Publication.publicationTypes
	publicationTypeLabels: [ 
		'Article in a journal, magazine, or other periodical',
		'Book or monograph'
	],
	
	initialize: function(){
		this.initializeSubTemplates();
		this.model.bind('change:type', this.render, this);
	},
	
	render: function() {
		var type = this.model.get('type'),
		    subTemplate = this.subTemplates[type];
			
		this.$el.html( this.template({view: this, model: this.model}) );
		
		// Render the specific fields for article or monograph typed publications
		this.$('#typeSpecificPublicationFields').html( subTemplate({ view: this, model: this.model }) );
		
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
	}
});
