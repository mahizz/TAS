define([],function(){

	var post = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorid": null,
			"text": null,
			"title": null,
			"created_at": null,
			"img": null,
			"score": 0
		},
		urlRoot : 'api/posts',
	});

	return post;
});