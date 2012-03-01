var ZooBank = {
	config: { endpoint: 'http://test.zoobank.org/editor/services.cfc' },
	
	autocompleteGenus: function(selector) {
		$(selector).customautocomplete({
	        source: function(request, response) {
				$.ajax({
					url: ZooBank.config.endpoint + "?method=get_protonym&RankGroup=Genus&display_type=autocomplete",
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
	ZooBank.ranks = new Ranks();
	ZooBank.ranks.reset([
		{ id: 50, label: "Family", fullRank: true },
		{ id: 53, label: "Subfamily" },
		{ id: 55, label: "Tribe" },
		{ id: 60, label: "Genus", fullRank: true },
		{ id: 63, label: "Subgenus" },
		{ id: 70, label: "Species", fullRank: true },
		{ id: 73, label: "Subspecies" } 
	]);

	ZooBank.nomenclaturalAct = new NomenclaturalAct({ rank: ZooBank.ranks.species() });

	var nomenView = new NomenclaturalActView({
		el:    $('#nomenclaturalAct')[0],
		model: ZooBank.nomenclaturalAct,
		ranks: ZooBank.ranks
	}).render();

});