define([],function(){

	var post = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorID": null,
			"text": null,
			"title": null,
			"date": null,
			"imgpath": null
		},
		url:"api/posts"
	});

	return post;
});