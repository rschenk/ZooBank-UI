var AuthorListInputView = Backbone.View.extend({
	events: {
		'keypress li:last-child input': 'addEmptyModel'
	},
	
	initialize: function() {
		_(this).bindAll('add', 'remove', 'renderView', 'addEmptyModel');
		
		this.authorInputViews =[];
		
		this.collection.each(this.add);
		this.collection.bind('add', this.add);
		this.collection.bind('remove', this.remove);
	},
	
	render: function(){
		this._rendered = true;
		this.$el.empty();
		
		_(this.authorInputViews).each(this.renderView);
		
		return this;
	},
	
	renderView: function(view) {
		var view_el;
		if(this._rendered) {
			view_el = view.render().el;
			this.$el.append(view_el);
		}
	},
	
	add: function(author) {
		var view = new AuthorInputView({
			model: author,
			tagName: 'li'
		});
		
		this.authorInputViews.push(view);
		this.renderView(view);
	},
	
	remove: function(author) {
		var view = _(this.authorInputViews).select(function(v){ return v.model === author; })[0];
		this.authorInputViews = _(this.authorInputViews).without(view);
		
		if(this._rendered) {
			view.remove();
		}
	}, 
	
	addEmptyModel: function() {
		this.collection.add({});
	}
});