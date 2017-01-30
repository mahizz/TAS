
define(['text!start/modules/wall/templates/topic.tpl.html',
	'start/modules/wall/views/postview',
	'start/modules/wall/models/post.model'],
	function(t,postView,postModel){

		var wallView = Backbone.View.extend({

			el: '.main-content',
			tpl: _.template($(t).closest("#wall-main").html()),
			id: null,
			model: null,
			events: {

			},

			initialize: function() {

				this.$posts = $("#posts");
				this.model = new postModel({id : this.id})
				
				this.listenTo(this.model, 'sync', this.render);
				this.model.fetch();
				this.render();
			},

			render: function() {
				$(this.el).html(this.tpl());
				var view = new postView({model : this.model});
				$("#posts").append(view.render().el);
				return this;		
			},

			showTopic: function() {

				return this;		
			},	
		

	});

	return wallView;

});