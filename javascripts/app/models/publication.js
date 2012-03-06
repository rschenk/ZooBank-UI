var Publication = Backbone.Model.extend({
	defaults: {
		id: null,
		lsid: '',
		type: 'article',
		published: false,
		year: null,
		month: null,
		day: null,
		authors: new Authors(),
		title: '',
		journalName: '', 
		issn: '',
		isbn: '',
		volume: '',
		issue: '',
		pages: '', 
		language: '',
		publisher: '', 
		city: '',
		edition: ''
	}
});
