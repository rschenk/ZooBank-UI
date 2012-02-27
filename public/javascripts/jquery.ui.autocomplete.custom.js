$.widget("ui.customautocomplete", $.extend({}, $.ui.autocomplete.prototype, {

  _response: function(content){
      $.ui.autocomplete.prototype._response.apply(this, arguments);
	  
	  if( !(content && content.length) ) {
		  this._trigger( "noresults", 0, this.element.val());
	  }
  }
}));
