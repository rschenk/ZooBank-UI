var ZooBank = {
	config: { endpoint: 'http://test.zoobank.org/editor/services.cfc' },
};

$(function(){
	$('form.uniForm').uniform({default_value_color: '#555'});
	
	// Boilerplate
	 ZooBank.taxonomy = new Taxonomy();
	 ZooBank.taxonomy.reset([
		{ id: 50, label: "Family", fullRank: true },
		{ id: 53, label: "Subfamily" },
		{ id: 55, label: "Tribe" },
		{ id: 60, label: "Genus", fullRank: true },
		{ id: 63, label: "Subgenus" },
		{ id: 70, label: "Species", fullRank: true },
		{ id: 73, label: "Subspecies" } 
	]);
	
	ZooBank.registration = new Registration({
		taxonName: new TaxonName({ rank:  ZooBank.taxonomy.species() }),
		newReference: new Reference()
	});
	
	var registrationFormView = new RegistrationFormView({
		el: $('form#registration')[0],
		model: ZooBank.registration
	})
	
	// Todo: move all these views into a reigstration form view
	var taxonNameView = new TaxonNameView({
		el: $('#taxonName')[0],
		model: ZooBank.registration.taxonName,
		taxonomy:  ZooBank.taxonomy
	}).render();
	
	var newReferenceView = new ReferenceFormView({
		el: $('#new_publication')[0],
		model: ZooBank.registration.newReference
	}).render();

});
