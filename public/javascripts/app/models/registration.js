var Registration = Backbone.Model.extend({
	referenceTypes: ['new', 'doi', 'recentPublication'],
	
	defaults: {
		selectedTab: 0,
		referenceType: '',
		newReference: null,
		doi: '',
		recentPublicationId: '',
		taxonName: null
	},
	
	initialize: function(spec) {
		this.newReference = spec.newReference
		this.taxonName = spec.taxonName;
		
		this.updateReferenceType();
		this.bind('change:selectedTab', this.updateReferenceType, this);
	},
	
	
	updateReferenceType: function(){
		this.set({
			referenceType: this.referenceTypes[this.get('selectedTab')]
		});
	}
});