define([],function(){

	var post = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorid": null,
			"text": null,
			"title": null,
			"created_at": null,
			"img": null
		},
		urlRoot : 'api/posts',
	});

	return post;
});