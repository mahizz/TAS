define([],function(){

	var post = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorID": null,
			"text": null,
			"title": "title",
			"date": null
		},
		url:"api/posts"
	});

	return post;
});