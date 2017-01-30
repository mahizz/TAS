define(['start/modules/users/models/user.model'],function(user){

	var users = Backbone.Collection.extend({
		model: user,
		url : 'api/users',
	});

	return users;

});