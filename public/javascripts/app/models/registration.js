var Registration = Backbone.Model.extend({
	publicationTypes: ['new', 'doi', 'recentPublication'],
	
	defaults: {
		selectedTab: 0,
		publicationType: '',
		newPublication: null,
		doi: '',
		recentPublicationId: '',
		nomenclaturalAct: null
	},
	
	initialize: function(spec) {
		this.newPublication = spec.newPublication;
		this.nomenclaturalAct = spec.nomenclaturalAct;
		
		this.updatePublicationType();
		this.bind('change:selectedTab', this.updatePublicationType, this);
	},
	
	
	updatePublicationType: function(){
		this.set({
			publicationType: this.publicationTypes[this.get('selectedTab')]
		});
	}
});