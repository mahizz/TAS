define([],function(){

	var post = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"creatorID": null,
			"text": "some",
			"title": "title",
			"date": "now"
		},
	});

	return post;
});