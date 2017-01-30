define(['start/modules/wall/models/comment.model'],function(comment){

	var comments = Backbone.Collection.extend({
		model: comment,
		url : 'api/comments',
	});

	return comments;

});