
define(['text!start/modules/wall/templates/wall.tpl.html',
	'start/modules/wall/views/postview',
	'start/modules/wall/models/post.model',
	'start/modules/wall/collections/posts.col'],
	function(t,postView,postModel,posts){

		var wallView = Backbone.View.extend({

			el: '.main-content',
			tpl: _.template($(t).closest("#wall-main").html()),

			events: {
				"click   #add-post":          "add"	
			},

			initialize: function() {
				this.$posts = $("#posts");
				this.posts = new posts();
				this.render();
			},

			render: function() {
				$(this.el).html(this.tpl());
				return this;		
			},
			add: function(e){
				e.preventDefault();
				var data = this.$el.find("#new-post").serializeArray();
				var t = _(data).reduce(function(acc, field) {
					acc[field.name] = field.value;
					return acc;
				}, {});
				var temp = new postModel(t);


				temp.save(null, {
					wait:true,
					success:function(model, response) {
						console.log('Successfully saved!');
					},
					error: function(model, error) {
						//console.log(model.toJSON());
						console.log('error');
					}
				});

				this.posts.add(temp);
				var view = new postView({model : temp});
				$("#posts").append(view.render().el);
			}
			

	});

	return wallView;

});