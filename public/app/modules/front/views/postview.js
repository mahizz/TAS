define(['text!start/modules/front/templates/topic.tpl.html',
	'start/modules/front/models/comment.model',
	'start/modules/front/collections/comments.col'],
	function(t,commentModel,comments){
	
	var commentView = Backbone.View.extend({
		el: '.card w-item',
		tpl: _.template($(t).closest("#wall-comment").html()),

		events: {
			
		},
		initialize: function() {
			this.render;		
		},

		render: function() {
			$(this.el).append(this.tpl(this.model.toJSON()));
			return this;		
		},
		add: function(e){
			e.preventDefault();
			$('#header').removeClass('search-toggled');
		}

	});

	var postView = Backbone.View.extend({
		tagname: 'div',
		tpl: _.template($(t).closest("#wall-post").html()),
		model: undefined,
		collection: undefined,
		events: {
			"click   .comment-open":          "toggleCommentOn", 
			"click   .comment-close":         "toggleCommentOff", 
			"click   .comment-add":           "comment"
		},

		initialize: function() {
			this.collection = new comments();
			this.collection.url = this.collection.url +"/"+ this.model.id;
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
			//this.render();
		},

		render: function() {
			$(this.el).append(this.tpl(this.model.toJSON()))
			return this;		
		},

		addComment: function(temp) {
			var view = new commentView({
				el : $(".list-group"),
				model : temp
			});

			view.render();
		},

		toggleCommentOn: function(e){
			console.log("test");
            if(!$(e.currentTarget).closest('.wic-form').hasClass('toggled')) {
                $(e.currentTarget).closest('.wic-form').addClass('toggled');
            }
		},

		toggleCommentOff: function(e){
            if($(e.currentTarget).closest('.wic-form').hasClass('toggled')) {
				$(e.currentTarget).closest('.wic-form').find('textarea').val('');
				$(e.currentTarget).closest('.wic-form').removeClass('toggled');
			}
		},
		
		comment: function(e){
			e.preventDefault();
			var data = $('textarea').val();
			var temp = new commentModel({
				text : data,
				postid : this.model.id
			});
			temp.save();
			this.collection.fetch();
		}

	});

	return postView;

});