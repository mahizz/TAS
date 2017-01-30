define([],function(){

	var user = Backbone.Model.extend({
		
		defaults: {
			"id": null,
			"name": null,
			"created_at": null,
		},
		urlRoot : 'api/users',
	});

	return user;
});