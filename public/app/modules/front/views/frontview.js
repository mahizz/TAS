
define(['text!start/modules/front/templates/wall.tpl.html',
	'start/modules/front/views/postview',
	'start/modules/front/models/post.model',
	'start/modules/front/collections/posts.col'],
	function(t,postView,postModel,posts){

		var frontView = Backbone.View.extend({

			collection: undefined,
			el: '.main-content',
			tpl: _.template($(t).closest("#front-main").html()),
			events: {
			},

			initialize: function() {
				this.collection = new posts();
				this.listenTo(this.collection, 'sync', this.render);
				this.collection.fetch();
				this.render();
			},

			render: function() {
				$(this.el).html(this.tpl());
				this.collection.each(this.addPost, this);
				console.log();
				return this;		
			},

			addPost: function(temp) {
			var view = new postView({
				el : $(".list-group"),
				model : temp
			});
			view.render();
		},
	
	});

	return frontView;

});