var ZooBank = {
	config: { endpoint: 'http://test.zoobank.org/editor/services.cfc' },
	
	autocompleteAuthor: function(selector) {
		$(selector).customautocomplete({
	        source: function(request, response) {
				$.ajax({
					url: ZooBank.config.endpoint + "?method=find_author",
					type: 'post',
					dataType: 'json',
					data: {term: request.term},
					success: function(data) {
						if( data[0].id === 0 ) {
							response(null);
						} else {
							response($.map(data, function(d, i){ 
								d.value = d.label; // The value has HTML in it, which never works anyways
								return d;
							}));
						}
					}
				})
	        },
	        minLength: 3,
			open: function(){},
			noresults: function(event,searchTerm){}
	      });		
	},
	
	initializeAuthorList: function(list_selector){
		var $authorList = $(list_selector),
			authorTemplate = _.template($('#authorTemplate').html());		
		
		$authorList.on('keypress', "li:last-child input", function(){
			var $author = $( authorTemplate({n: $authorList.children().length + 1}) );
			ZooBank.autocompleteAuthor($author.find('input.authorInput'));
			
			$author.appendTo($authorList).hide().slideDown();
		});

	}
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

	ZooBank.nomenclaturalAct = new NomenclaturalAct({ rank:  ZooBank.taxonomy.species() });

	var nomenView = new NomenclaturalActView({
		el: $('#nomenclaturalAct')[0],
		model: ZooBank.nomenclaturalAct,
		taxonomy:  ZooBank.taxonomy
	}).render();

});