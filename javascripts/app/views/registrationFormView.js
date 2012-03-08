var RegistrationFormView = Backbone.View.extend({
	events: {
		'tabsselect': 'tabselect',
		'change #doi': 'changeDoi',
		'click input[name="recentPublicationId"]': 'changeRecentPublicationId'
	},
	
	initialize: function(){
		this.$('#publicationTabs').tabs({ 
			selected: this.model.get('selectedTab'),
			fx: { height: 'toggle' }
		});
	},
	
	tabselect: function(event, ui) {
		this.model.set({
			selectedTab: ui.index
		});
	},
	
	changeDoi: function(event) {
		this.model.set({
			doi: $(event.target).val()
		});
	}, 
	
	changeRecentPublicationId: function(event){
		this.model.set({
			recentPublicationId: $(event.target).val()
		});
	}
});
