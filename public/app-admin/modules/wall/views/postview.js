define(['text!start/modules/wall/templates/wall.tpl.html'],function(t,post){
	
	var commentView = Backbone.View.extend({
		el: '.card w-item',
		tpl: _.template($(t).closest("#wall-comment").html()),

		events: {
			
		},
		initialize: function() {

			this.render();
		},

		render: function() {
			$(this.el).append(this.tpl());
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
		events: {
			"click   .comment-open":          "toggleCommentOn", 
			"click   .comment-close":         "toggleCommentOff", 
			"click   .comment-add":           "comment"
		},

		initialize: function() {
			//this.render();
		},

		render: function() {
			this.el.innerHTML = this.tpl(this.model.toJSON());
			return this;		
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
			new commentView({el:$(e.delegateTarget).find(".list-group")});
		}

	});

	return postView;

});