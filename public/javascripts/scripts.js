var ZooBank = {
	config: { endpoint: 'http://test.zoobank.org/editor/services.cfc' },
};

$(function(){
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
		nomenclaturalAct: new NomenclaturalAct({ rank:  ZooBank.taxonomy.species() }),
		newPublication: new Publication()
	});
	
	var registrationFormView = new RegistrationFormView({
		el: $('form#registration')[0],
		model: ZooBank.registration
	})
	
	// Todo: move all these views into a reigstration form view
	var nomenclaturalActView = new NomenclaturalActView({
		el: $('#nomenclaturalAct')[0],
		model: ZooBank.registration.nomenclaturalAct,
		taxonomy:  ZooBank.taxonomy
	}).render();
	
	var newPublicationView = new PublicationFormView({
		el: $('#new_publication')[0],
		model: ZooBank.registration.newPublication
	}).render();

});
