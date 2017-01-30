define([],function(){

	var comment = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorid": null,
			"postid": null,
			"text": null,
			"created_at": null,
		},
		urlRoot : 'api/comments',
	});

	return comment;
});