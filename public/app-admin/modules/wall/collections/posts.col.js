define(['start/modules/wall/models/post.model'],function(post){

	var posts = Backbone.Collection.extend({
		model: post,

	});

	return posts;

});