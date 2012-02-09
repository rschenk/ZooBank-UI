var ZooBank = {
	autocompleteGenus: function(selector) {
		$(selector).customautocomplete({
	        source: function(request, response) {
				$.ajax({
					url: "http://test.zoobank.org/editor/services.cfc?method=get_protonym&RankGroup=Genus&display_type=autocomplete",
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
					url: "http://test.zoobank.org/editor/services.cfc?method=find_author",
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
		console.log("Jerome Action")
		var $authorList = $(list_selector);		
		
		$authorList.on('keypress', "li:last-child input", function(){
			var $author = ich.authorTemplate({n: $authorList.children().length + 1});
			ZooBank.autocompleteAuthor($author.find('input.authorInput'));
			
			$author.appendTo($authorList).hide().slideDown();
		});

	}
	
};